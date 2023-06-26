import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bail } from './bail.entity';
import { BailCreateDto } from './dto/bail.create.dto';
import { Contract } from '../contract.entity';

@Injectable()
export class BailService {
  constructor(
    @Inject('BAIL_REPOSITORY')
    private bailRepository: Repository<Bail>,
  ) {}

  async findAll(): Promise<Bail[]> {
    return this.bailRepository.find();
  }

  async delete(id: number): Promise<number> {
    const response = await this.bailRepository.delete(id);
    console.log('bail deleted as successfully');

    return response.affected;
  }

  async findBy(by: object): Promise<Bail[]> {
    return await this.bailRepository.findBy(by);
  }

  async findOne(id: number): Promise<Bail> {
    return this.bailRepository.findOneBy({ id });
  }

  async update(contractId: number, data: BailCreateDto): Promise<string> {
    let bail = await this.bailRepository.findOneBy({
      contract: { id: contractId },
    });

    if (!bail) throw new NotFoundException(`Contract ${contractId} not found`);

    const bailArrayEntries = Object.entries(bail).map((item) => {
      return [item[0], data[item[0]] ? data[item[0]] : item[1]];
    });

    bail = Object.fromEntries(bailArrayEntries);

    return this.bailRepository
      .update({ id: bail?.id }, bail)
      .then(() => {
        const msg = `Bail ${bail?.id} updated as successfuly`;
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

  async create(data: BailCreateDto, contract: Contract): Promise<Bail> {
    const bail = this.bailRepository.create({ ...data, contract });

    return this.bailRepository
      .save(bail)
      .then(() => {
        const msg = `Bail ${bail.id} created as succesfily`;
        console.log(msg);

        return bail;
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
