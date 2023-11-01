import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { Cashier } from './cashier.entity';
import CashFlowReport from 'src/templates/cashFlowReport';
import { currencyFormatter } from 'src/utils/formatters';
import { create as buildHtml } from 'puppeteer-html-pdf';

@Injectable()
export class CashierService {
  constructor(
    @Inject('CASHIER_REPOSITORY')
    private cashierRepository: Repository<Cashier>,
  ) {}

  async findAll(): Promise<Cashier[]> {
    return await this.cashierRepository.find();
  }

  async findOne(id: number): Promise<Cashier> {
    return await this.cashierRepository.findOneBy({ id });
  }

  async openedCashier(): Promise<Cashier> {
    const cashier = await this.cashierRepository.findOne({
      where: { status: 'open' },
    });

    return cashier;
  }

  async generateCashFlowReport({
    cashier,
  }: {
    cashier: Cashier;
  }): Promise<Buffer> {
    const cashierGenericTransactions =
      cashier?.transaction?.filter(
        (transaction) => transaction.category === 'generic',
      ) ?? [];
    const cashierRentTransactions = cashier?.transaction?.filter(
      (transaction) => transaction.category === 'rent',
    );

    const genericTransactions =
      cashierGenericTransactions.map((transaction) => ({
        description: transaction.description,
        type: transaction.type === 'credit' ? 'Crédito' : 'Débito',
        amount: currencyFormatter({ value: transaction.amount ?? 0 }),
        formOfPayment: transaction.formOfPayment ?? 'Não informado',
      })) ?? [];

    const rentTransactions =
      cashierRentTransactions?.map((transaction) => {
        const amount = currencyFormatter({ value: transaction.amount ?? 0 });

        return {
          tenant: {
            fullName:
              JSON.parse(transaction?.metadata ?? '{}')?.tenant?.fullName ??
              'Não informado',
          },
          amount,
          type: transaction.type === 'credit' ? 'Crédito' : 'Débito',
          formOfPayment: transaction.formOfPayment ?? 'Não informado',
        };
      }) ?? [];

    const totalGenericTransactions = cashierGenericTransactions.reduce(
      (old, transaction) => {
        const debit = transaction.type === 'debit' ? transaction.amount : 0;
        const credit = transaction.type === 'credit' ? transaction.amount : 0;

        return {
          debit: old.debit + debit,
          credit: old.credit + credit,
        };
      },
      { debit: 0, credit: 0 },
    );

    const totalGenericTransactionsFormatted = {
      credit: currencyFormatter({
        value: totalGenericTransactions.credit,
      }),
      debit: currencyFormatter({
        value: totalGenericTransactions.debit,
      }),
    };

    const totalRentTransactions = cashierRentTransactions.reduce(
      (old, transaction) => {
        const debit = transaction.type === 'debit' ? transaction.amount : 0;
        const credit = transaction.type === 'credit' ? transaction.amount : 0;

        return {
          debit: old.debit + debit,
          credit: old.credit + credit,
        };
      },
      { debit: 0, credit: 0 },
    );

    const totalRentTransactionsFormatted = {
      credit: currencyFormatter({
        value: totalRentTransactions.credit,
      }),
      debit: currencyFormatter({
        value: totalRentTransactions.debit,
      }),
    };

    const totalCredit = currencyFormatter({
      value: totalRentTransactions.credit + totalGenericTransactions.credit,
    });

    const totalDebit = currencyFormatter({
      value: totalRentTransactions.debit + totalGenericTransactions.debit,
    });

    const balance = currencyFormatter({
      value:
        totalRentTransactions.credit +
        totalGenericTransactions.credit -
        (totalRentTransactions.debit + totalGenericTransactions.debit),
    });

    return buildHtml(
      CashFlowReport({
        cashier: {
          closedAt: cashier.closedAt.toLocaleDateString('pt-BR', {}),
          name: cashier.name,
          genericTransactions,
          rentTransactions,
          totalGenericTransactions: totalGenericTransactionsFormatted,
          totalRentTransactions: totalRentTransactionsFormatted,
          administrationFee: '',
          totalCredit,
          totalDebit,
          balance,
        },
      }),
      { format: 'A4' },
    );
  }

  async cashFlowReport({ cashierId }: { cashierId: number }): Promise<Buffer> {
    const cashier = await this.cashierRepository.findOne({
      where: { id: cashierId },
      relations: { transaction: true },
    });

    if (!cashier)
      throw new NotFoundException(`cashier ${cashierId} not found.`);

    return await this.generateCashFlowReport({ cashier });
  }

  async getCashiersClosedByDate({
    date,
  }: {
    date: string;
  }): Promise<Cashier[]> {
    const dateMin = new Date(date);
    const dateMax = new Date(date);
    dateMax.setUTCHours(23, 59, 59);

    const cashiers = await this.cashierRepository.findBy({
      closedAt: Between(dateMin, dateMax),
    });

    return cashiers;
  }

  async close(): Promise<number> {
    const cashier = await this.openedCashier();
    if (!cashier) throw new NotFoundException(`No cashier open`);

    const date = new Date();

    return (
      await this.cashierRepository.update(cashier?.id, {
        name: date.toLocaleTimeString('pt-BR', {
          minute: '2-digit',
          hour: '2-digit',
        }),
        closedAt: date,
        status: 'closed',
      })
    ).affected;
  }

  async open(): Promise<Cashier> {
    if (await this.openedCashier())
      throw new ConflictException(`Cashier already opened`);

    const cashier = this.cashierRepository.create({});

    return await this.cashierRepository
      .save(cashier)
      .then(() => {
        const msg = `Cashier ${cashier?.id} created as succesfily`;
        console.log(msg);

        return cashier;
      })
      .catch((error) => {
        console.log(error);

        throw new HttpException(
          error.driverError.sqlMessage,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async delete(id: number): Promise<number> {
    return (await this.cashierRepository.delete(id)).affected;
  }
}
