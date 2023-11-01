import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { TransactionCreateDto } from './dto/transaction.create.dto';
import { CashierService } from '../cashier.service';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: Repository<Transaction>,
    private cashierService: CashierService,
  ) {}

  async findByCategory({
    category,
    cashierId,
    allRelations,
  }: {
    category: 'rent' | 'generic';
    cashierId: number;
    allRelations?: boolean;
  }): Promise<Transaction[]> {
    if (!cashierId) return [];

    const relations = allRelations
      ? ['installment', 'installment.contract.tenant.property.locator']
      : ['installment'];

    return await this.transactionRepository.find({
      where: { category, cashier: { id: cashierId } },
      relations,
    });
  }

  async delete(id: number): Promise<number> {
    return (await this.transactionRepository.delete(id)).affected;
  }

  async create(data: TransactionCreateDto): Promise<Transaction> {
    const cashier = await this.cashierService.openedCashier();
    if (!cashier) throw new NotFoundException(`No cashier open`);

    const transaction = this.transactionRepository.create({
      ...data,
      data: JSON.stringify(data?.data),
      metadata: JSON.stringify(data?.metadata),
      cashier,
    });

    return await this.transactionRepository
      .save(transaction)
      .then(() => {
        const msg = `Transaction ${transaction?.id} created as succesfily`;
        console.log(msg);

        return transaction;
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
