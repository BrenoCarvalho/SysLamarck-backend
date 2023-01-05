import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Resident } from './resident.entity';
import { ResidentCreateDto } from './dto/resident.create.dto';

@Injectable()
export class ResidentService {
  constructor(
    @Inject('RESIDENT_REPOSITORY')
    private residentRepository: Repository<Resident>,
  ) {}

  async findAll(): Promise<Resident[]> {
    return this.residentRepository.find();
  }

  async delete(residentCode: number): Promise<number> {
    const response = await this.residentRepository.delete(residentCode);
    console.log('resident deleted as successfully');

    return response.affected;
  }

  async find(query: object) {
    return await this.residentRepository.find(query);
  }

  async findBy(by: object): Promise<Resident[]> {
    return await this.residentRepository.findBy(by);
  }

  async findOne(residentCode: number): Promise<Resident> {
    return await this.residentRepository.findOneBy({
      residentCode: residentCode,
    });
  }

  async update(residentCode: number, data: ResidentCreateDto): Promise<string> {
    const resident = await this.residentRepository.findOneBy({
      residentCode: residentCode,
    });

    if (!resident) {
      throw new NotFoundException(`Resident ${residentCode} not found`);
    }

    return this.residentRepository
      .update({ residentCode: residentCode }, data)
      .then(() => {
        const msg = `Resident ${residentCode} updated as successfuly`;
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
  async create(data: ResidentCreateDto): Promise<Resident> {
    const resident = new Resident();

    resident.fullName = data.fullName;
    resident.rg = data.rg;
    resident.cpf = data.cpf;
    resident.contact1 = data.contact1;

    return await this.residentRepository
      .save(resident)
      .then(() => {
        const msg = `Resident ${resident.residentCode} created as succesfily`;
        console.log(msg);

        return resident;
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
