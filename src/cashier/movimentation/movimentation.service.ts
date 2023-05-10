import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movimentation } from './movimentation.entity';
import { MovimentationCreateDto } from './dto/movimentation.create.dto';

@Injectable()
export class MovimentationService {
  constructor(
    @Inject('MOVIMENTATION_REPOSITORY')
    private movimentationRepository: Repository<Movimentation>,
  ) {}

  async delete(id: number): Promise<number> {
    return (await this.movimentationRepository.delete(id)).affected;
  }

  async findAll(conditions?: any): Promise<Movimentation[]> {
    return this.movimentationRepository.find(conditions);
  }

  async create(data: MovimentationCreateDto): Promise<string> {
    const movimentation = new Movimentation();

    movimentation.description = data?.description;
    movimentation.date = data?.date;
    movimentation.credit = data?.credit;
    movimentation.debit = data?.debit;

    return this.movimentationRepository
      .save(movimentation)
      .then(() => {
        const msg = `Movimentation ${movimentation.id} created as succesfily`;
        console.log(msg);

        return msg;
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
