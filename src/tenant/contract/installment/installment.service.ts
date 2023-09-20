import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Installment } from './installment.entity';
import { InstallmentCreateDto } from './dto/installment.create.dto';
import { Contract } from '../contract.entity';
import { ContractService } from '../contract.service';
import { TransactionService } from 'src/cashier/transaction/transaction.service';
import { Transaction } from 'src/cashier/transaction/transaction.entity';
import { ReportService } from 'src/report/report.service';
import { create as buildHtml } from 'puppeteer-html-pdf';
import RentReceipt from 'src/templates/rentReceipt';
import {
  currencyFormatter,
  dateFormatter,
  propertyCodeFormatter,
} from 'src/templates/formatters';

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
    private readonly reportService: ReportService,
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

    return await this.installmentRepository.find({
      where: { contract: { tenant: { id: tenantId } } },
      loadRelationIds: true,
      relations: {
        transaction: true,
      },
    });
  }

  async generateInstallments(contract: Contract) {
    for (let month = 1; month <= contract?.duration; month++) {
      const dueDate = new Date();

      dueDate.setDate(contract?.payday);
      dueDate.setMonth(dueDate.getMonth() + month);

      await this.create({
        contract: contract,
        currentInstallment: `${month}/${contract?.duration}`,
        dueDate: dueDate,
        amount: contract?.leaseAmount,
        status: month <= contract?.gracePeriod ? 'Ca' : 'Dv',
      });
    }
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

    const dueDate = dateFormatter({
      value: installment.dueDate,
    });

    const referentialMonth = `${
      monthNames.indexOf(installment.referenceMonth) + 1
    }/${dueDate.slice(6)}`;

    const paymentDate = new Date(
      installment.transaction[0].createdAt,
    ).toLocaleDateString('pt-BR', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });

    const transactionData = JSON.parse(installment.transaction[0].data);

    const buffer = buildHtml(
      RentReceipt({
        tenantFullName: installment.contract.tenant.fullName,
        propertyAddress: installment.contract.tenant.property.address,
        locatorFullName: installment.contract.tenant.property.locator.fullName,
        propertyCode: propertyCodeFormatter({
          value: installment.contract.tenant.property.propertyCode,
        }),
        referentialMonth,
        dueDateMonth: dueDate.slice(3),
        dueDate,
        paymentDate: paymentDate,
        currentInstallment: installment.currentInstallment,
        installmentTransactionAmount: currencyFormatter({
          value: installment.transaction[0].amount,
        }),
        rent: currencyFormatter({ value: transactionData['rent'] }),
        iptu: currencyFormatter({ value: transactionData['iptu'] }),
        water: currencyFormatter({ value: transactionData['water'] }),
        eletricity: currencyFormatter({ value: transactionData['eletricity'] }),
        condominium: currencyFormatter({
          value: transactionData['condominium'],
        }),
        incomeTax: currencyFormatter({ value: transactionData['incomeTax'] }),
        specialDiscount: currencyFormatter({
          value: transactionData['specialDiscount'],
        }),
        breachOfContractFine: currencyFormatter({
          value: transactionData['breachOfContractFine'],
        }),
      }),
      {
        format: 'A4',
      },
    );

    return buffer;
  }

  async pay({
    tenantId,
    amount,
    formOfPayment,
    data,
  }: {
    tenantId: number;
    amount: number;
    formOfPayment: string;
    data: string;
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
      installment: contract?.currentInstallment,
    });

    await this.installmentRepository.update(contract?.currentInstallment?.id, {
      status: 'Pg',
    });

    await this.contractService.updateCurrentInstallment(tenantId);

    return contract?.currentInstallment?.id;
  }

  async transfer({
    installmentId,
    amount,
    formOfPayment,
    data,
  }: {
    installmentId: number;
    amount: number;
    formOfPayment: string;
    data: string;
  }): Promise<Transaction> {
    const installment = await this.findOne(installmentId);

    return await this.transactionService.create({
      category: 'rent',
      type: 'debit',
      amount,
      data,
      formOfPayment,
      installment,
    });
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
