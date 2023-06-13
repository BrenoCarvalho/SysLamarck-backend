import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Rent } from './rent.entity';
import { RentCreateDto } from './dto/rent.create.dto';

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
export class RentService {
  constructor(
    @Inject('RENT_REPOSITORY')
    private rentRepository: Repository<Rent>,
  ) {}

  async create(data: RentCreateDto): Promise<Rent> {
    const rent = new Rent();

    rent.contract = data.contract;
    rent.installmentNumber = data.installmentNumber;
    rent.dueDate = data.dueDate;
    rent.referenceMonth = monthNames[rent?.dueDate?.getMonth() - 1];
    rent.amount = data.amount;
    rent.status = data.status;

    return await this.rentRepository
      .save(rent)
      .then(() => {
        const msg = `Rent ${rent.id} created as succesfily`;
        console.log(msg);

        return rent;
      })
      .catch((error) => {
        console.log(error.driverError.sqlMessage);

        throw new HttpException(
          error.driverError.sqlMessage,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
