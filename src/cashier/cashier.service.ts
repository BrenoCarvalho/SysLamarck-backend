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
