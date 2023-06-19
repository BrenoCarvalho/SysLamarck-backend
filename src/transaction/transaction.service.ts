import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { TransactionCreateDto } from './dto/transaction.create.dto';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: Repository<Transaction>,
  ) {}

  async findByCategory({
    category,
    start,
    end,
    allRelations,
  }: {
    category: 'rent' | 'generic';
    start?: Date | null;
    end?: Date | null;
    allRelations?: boolean;
  }): Promise<Transaction[]> {
    const where =
      start && end
        ? { category, createdAt: Between(start, end) }
        : { category };

    const relations = allRelations
      ? ['installment', 'installment.contract.tenant.property.locator']
      : ['installment'];

    return await this.transactionRepository.find({
      where,
      relations,
    });
  }

  async delete(id: number): Promise<number> {
    return (await this.transactionRepository.delete(id)).affected;
  }

  async create(data: TransactionCreateDto): Promise<Transaction> {
    const transaction = new Transaction();

    transaction.category = data?.category;
    transaction.type = data?.type;
    transaction.amount = data?.amount;
    transaction.formOfPayment = data?.formOfPayment;
    transaction.description = data?.description;
    transaction.data = JSON.stringify(data?.data);
    transaction.installment = data?.installment;

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
