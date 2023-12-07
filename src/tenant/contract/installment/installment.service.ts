import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
  forwardRef,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Installment } from './installment.entity';
import { InstallmentCreateDto } from './dto/installment.create.dto';
import { Contract } from '../contract.entity';
import { ContractService } from '../contract.service';
import { TransactionService } from 'src/cashier/transaction/transaction.service';
import { Transaction } from 'src/cashier/transaction/transaction.entity';
import { create as buildHtml } from 'puppeteer-html-pdf';
import {
  RentReceiptDefaultProps,
  RentReceiptForLocator,
  RentReceiptForTenant,
} from 'src/templates/rentReceipt';
import { currencyFormatter, propertyCodeFormatter } from 'src/utils/formatters';

const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

@Injectable()
export class InstallmentService {
  constructor(
    @Inject('INSTALLMENT_REPOSITORY')
    private installmentRepository: Repository<Installment>,
    @Inject(forwardRef(() => ContractService))
    private contractService: ContractService,
    private transactionService: TransactionService,
  ) {}

  async findOne(id: number): Promise<Installment> {
    if (!id) throw new NotFoundException(`Invalid id.`);

    const installment = await this.installmentRepository.findOne({
      where: { id },
      relations: { transaction: true },
    });

    installment?.transaction?.map(
      (transaction) =>
        (installment.transaction[
          installment.transaction.indexOf(transaction)
        ].data = JSON?.parse(transaction.data)),
    );

    return installment;
  }

  async findByTenantId(tenantId: number): Promise<Installment[]> {
    if (!tenantId) return;

    const installments = (
      await this.installmentRepository.find({
        where: { contract: { tenant: { id: tenantId } } },
        loadRelationIds: true,
        relations: {
          transaction: true,
        },
      })
    ).sort(
      (a, b) =>
        Number(
          a.currentInstallment.substring(0, a.currentInstallment.length - 3),
        ) -
        Number(
          b.currentInstallment.substring(0, b.currentInstallment.length - 3),
        ),
    );

    return installments;
  }

  async generateAdditionalInstallment(contract: Contract) {
    const dueDateForAdditionalInstallment = new Date(contract.start);
    dueDateForAdditionalInstallment.setMonth(
      dueDateForAdditionalInstallment.getMonth() + 1,
    );
    dueDateForAdditionalInstallment.setDate(contract.payday);

    await this.create({
      contract: contract,
      currentInstallment: `0/${contract?.duration}`,
      dueDate: dueDateForAdditionalInstallment,
      amount: contract?.leaseAmount,
      status: 'Dv',
    });
  }

  async generateInstallments(contract: Contract) {
    if (contract?.additionalInstallment)
      this.generateAdditionalInstallment(contract);

    const startDueDate = new Date(contract.start);
    if (contract?.additionalInstallment)
      startDueDate.setMonth(startDueDate.getMonth() + 1);

    for (let month = 1; month <= contract?.duration; month++) {
      const dueDate = new Date(startDueDate);
      dueDate.setMonth(dueDate.getMonth() + month);

      await this.create({
        contract: contract,
        currentInstallment: `${month}/${contract?.duration}`,
        dueDate: dueDate,
        amount: contract?.leaseAmount,
        status:
          month <= contract?.installmentsPaid ?? 0
            ? 'Pg'
            : month <= contract?.gracePeriod + (contract?.installmentsPaid ?? 0)
            ? 'Ca'
            : 'Dv',
      });
    }
  }

  defaultDataForReceipt({
    installment,
  }: {
    installment: Installment;
  }): RentReceiptDefaultProps {
    const dueDate = installment.dueDate;

    const referenceMonth = `${
      monthNames.indexOf(installment.referenceMonth) + 1
    }/${dueDate.getFullYear()}`;

    const paymentDate = new Date(
      installment.transaction[0].createdAt,
    ).toLocaleDateString('pt-BR', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });

    return {
      tenant: {
        fullName: installment.contract.tenant.fullName,
      },
      locator: {
        fullName: installment.contract.tenant.property.locator.fullName,
      },
      property: {
        address: installment.contract.tenant.property.address,
        propertyCode: propertyCodeFormatter({
          value: installment.contract.tenant.property.propertyCode,
        }),
      },
      installment: {
        referenceMonth,
        dueDateMonth: dueDate.toLocaleDateString('pt-BR'),
        dueDate: dueDate.toLocaleDateString('pt-BR'),
        paymentDate: paymentDate,
        currentInstallment: installment.currentInstallment,
      },
    };
  }

  async generateReceiptForTenant({
    installment,
  }: {
    installment: Installment;
  }): Promise<Buffer> {
    if (!installment.transaction[0]) {
      throw new InternalServerErrorException(
        'Installment missing credit transaction data.',
      );
    }

    const creditTransactionData = JSON.parse(installment.transaction[0]?.data);

    return buildHtml(
      RentReceiptForTenant({
        ...this.defaultDataForReceipt({ installment }),
        creditTransaction: {
          amount: currencyFormatter({
            value: installment.transaction[0].amount,
          }),
          rent: currencyFormatter({ value: creditTransactionData['rent'] }),
          iptu: currencyFormatter({ value: creditTransactionData['iptu'] }),
          water: currencyFormatter({
            value: creditTransactionData['water'],
          }),
          eletricity: currencyFormatter({
            value: creditTransactionData['eletricity'],
          }),
          condominium: currencyFormatter({
            value: creditTransactionData['condominium'],
          }),
          incomeTax: currencyFormatter({
            value: creditTransactionData['incomeTax'],
          }),
          specialDiscount: currencyFormatter({
            value: creditTransactionData['specialDiscount'],
          }),
          breachOfContractFine: currencyFormatter({
            value: creditTransactionData['breachOfContractFine'],
          }),
          sundry: creditTransactionData['sundry'],
          sundryDescription: creditTransactionData['sundryDescription'],
        },
      }),
      { format: 'A4' },
    );
  }

  async generateReceiptForLocator({
    installment,
  }: {
    installment: Installment;
  }): Promise<Buffer> {
    if (!installment.transaction[0]) {
      throw new InternalServerErrorException(
        'Installment missing credit transaction data.',
      );
    } else if (!installment.transaction[1]) {
      throw new InternalServerErrorException(
        'Installment missing debit transaction data.',
      );
    }

    const creditTransactionData = JSON.parse(installment.transaction[0]?.data);
    const debitTransactionData = JSON.parse(installment.transaction[1]?.data);

    return buildHtml(
      RentReceiptForLocator({
        ...this.defaultDataForReceipt({ installment }),
        creditTransaction: {
          amount: currencyFormatter({
            value: creditTransactionData.amount,
          }),
          rent: currencyFormatter({ value: creditTransactionData['rent'] }),
          iptu: currencyFormatter({ value: creditTransactionData['iptu'] }),
          water: currencyFormatter({
            value: creditTransactionData['water'],
          }),
          eletricity: currencyFormatter({
            value: creditTransactionData['eletricity'],
          }),
          condominium: currencyFormatter({
            value: creditTransactionData['condominium'],
          }),
          incomeTax: currencyFormatter({
            value: creditTransactionData['incomeTax'],
          }),
          specialDiscount: currencyFormatter({
            value: creditTransactionData['specialDiscount'],
          }),
          breachOfContractFine: currencyFormatter({
            value: creditTransactionData['breachOfContractFine'],
          }),
          sundry: currencyFormatter({
            value: debitTransactionData['sundry'],
          }),
          sundryDescription: creditTransactionData['sundryDescription'],
        },
        debitTransaction: {
          amount: currencyFormatter({
            value: debitTransactionData.amount,
          }),
          water: currencyFormatter({
            value: debitTransactionData['water'],
          }),
          rent: currencyFormatter({
            value: debitTransactionData['rent'],
          }),
          eletricity: currencyFormatter({
            value: debitTransactionData['eletricity'],
          }),
          iptu: currencyFormatter({ value: debitTransactionData['iptu'] }),
          incomeTax: currencyFormatter({
            value: debitTransactionData['incomeTax'],
          }),
          condominium: currencyFormatter({
            value: debitTransactionData['condominium'],
          }),
          administrationFee: currencyFormatter({
            value: debitTransactionData['administrationFee'],
          }),
          leaseFee: currencyFormatter({
            value: debitTransactionData['leaseFee'],
          }),
          sundry: currencyFormatter({
            value: debitTransactionData['sundry'],
          }),
          sundryDescription: debitTransactionData['sundryDescription'],
        },
      }),

      {
        format: 'A4',
      },
    );
  }

  async receipt({
    installmentId,
    mode,
  }: {
    installmentId: number;
    mode: 'tenant' | 'locator';
  }): Promise<any> {
    const installment = await this.installmentRepository.findOne({
      where: {
        id: installmentId,
      },
      relations: [
        'transaction',
        'contract',
        'contract.tenant',
        'contract.tenant.property',
        'contract.tenant.property.locator',
      ],
    });

    if (mode == 'tenant') {
      return await this.generateReceiptForTenant({ installment });
    } else {
      return await this.generateReceiptForLocator({ installment });
    }
  }

  async rollbackPayment({
    installmentId,
  }: {
    installmentId: number;
  }): Promise<number> {
    const installment = await this.installmentRepository.findOne({
      where: { id: installmentId },
      relations: ['transaction', 'contract', 'contract.tenant'],
    });

    if (!installment)
      throw new NotFoundException(`Installment ${installmentId} not found.`);

    if (installment.status != 'Pg')
      throw new BadRequestException('Installment is not paid.');

    await Promise.all(
      installment.transaction?.map(
        async (transaction) =>
          await this.transactionService.delete(transaction.id),
      ),
    );

    await this.installmentRepository.update(
      { id: installment.id },
      { status: 'Dv' },
    );

    return await this.contractService.updateCurrentInstallment(
      installment.contract.tenant.id,
    );
  }

  async pay({
    tenantId,
    amount,
    formOfPayment,
    data,
    metadata,
  }: {
    tenantId: number;
    amount: number;
    formOfPayment: string;
    data: string | object;
    metadata: string | object;
  }): Promise<number> {
    const contract = await this.contractService.findOneByTenantId({
      tenantId,
      showCurrentInstallment: true,
    });

    if (contract.currentInstallment.status != 'Dv') {
      throw new BadRequestException('Installment already paid');
    }

    await this.transactionService.create({
      category: 'rent',
      type: 'credit',
      amount,
      formOfPayment,
      data,
      metadata,
      installment: contract?.currentInstallment,
    });

    await this.installmentRepository.update(contract?.currentInstallment?.id, {
      status: 'Pg',
    });

    await this.contractService.updateCurrentInstallment(tenantId);

    return contract?.currentInstallment?.id;
  }

  async rollbackPaymentTransfer({
    installmentId,
  }: {
    installmentId: number;
  }): Promise<number> {
    const installment = await this.installmentRepository.findOne({
      where: { id: installmentId },
      relations: ['transaction', 'contract', 'contract.tenant'],
    });

    if (!installment)
      throw new NotFoundException(`Installment ${installmentId} not found.`);

    if (installment.status != 'Pg')
      throw new BadRequestException('Installment is not paid.');

    if (installment.transaction.length < 2)
      throw new BadRequestException(
        'Installment does not have payment transfer.',
      );

    return await this.transactionService.delete(installment.transaction[1].id);
  }

  async transfer({
    installmentId,
    amount,
    formOfPayment,
    data,
    metadata,
  }: {
    installmentId: number;
    amount: number;
    formOfPayment: string;
    data: string | object;
    metadata: string | object;
  }): Promise<Transaction> {
    const installment = await this.findOne(installmentId);

    return await this.transactionService.create({
      category: 'rent',
      type: 'debit',
      amount,
      data,
      metadata,
      formOfPayment,
      installment,
    });
  }

  async update(contract: Contract) {
    const installments = await this.installmentRepository.findBy({
      contract: { id: contract.id },
    });

    return await Promise.all(
      installments.map(async (installment) => {
        const newDueDate = new Date(installment.dueDate);
        newDueDate.setDate(contract.payday);

        installment.amount = contract.leaseAmount;
        installment.dueDate = newDueDate;

        await this.installmentRepository.update(
          { id: installment.id },
          installment,
        );
      }),
    );
  }

  async create(data: InstallmentCreateDto): Promise<Installment> {
    const referenceMonthIndex =
      data?.dueDate?.getMonth() == 0
        ? monthNames?.length - 1
        : data?.dueDate?.getMonth() - 1;

    const installment = this.installmentRepository.create({
      ...data,
      referenceMonth: monthNames[referenceMonthIndex],
    });

    return await this.installmentRepository
      .save(installment)
      .then(() => {
        const msg = `Installment ${installment?.id} created as succesfily`;
        console.log(msg);

        return installment;
      })
      .catch((error) => {
        console.log(error);

        throw new HttpException(
          error.driverError.sqlMessage,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
