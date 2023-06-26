import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Locator } from './locator.entity';
import { LocatorCreateDto } from './dto/locator.create.dto';

@Injectable()
export class LocatorService {
  constructor(
    @Inject('LOCATOR_REPOSITORY')
    private locatorRepository: Repository<Locator>,
  ) {}

  async findAll(showProperties?: boolean): Promise<Locator[]> {
    return this.locatorRepository.find({
      relations: { property: showProperties ?? false },
    });
  }

  async delete(id: number): Promise<number> {
    return (await this.locatorRepository.delete(id)).affected;
  }

  async findOne(id: number, showProperties?: boolean): Promise<Locator> {
    if (!id) throw new NotFoundException(`Invalid id.`);

    return this.locatorRepository.findOne({
      where: { id },
      relations: { property: showProperties ?? false },
    });
  }

  async update(id: number, data: LocatorCreateDto): Promise<string> {
    if (!(await this.locatorRepository.findOneBy({ id }))) {
      throw new NotFoundException(`Locator ${id} not found`);
    }

    return this.locatorRepository
      .update({ id }, data)
      .then(() => {
        const msg = `Locator ${id} updated as successfuly`;
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

  async generateLocatorCode(): Promise<number> {
    const response = await this.locatorRepository.find({
      select: { id: true },
    });

    const locatorsCode = [];

    response.map((value) => {
      locatorsCode.push(value.id);
    });

    let code = null;
    let stop = false;

    if (Math.min(...locatorsCode) > 1) {
      code = 1;
    } else {
      locatorsCode.map((value, index) => {
        if (!stop && locatorsCode[index + 1] != value + 1) {
          code = value + 1;
          stop = true;
        }
      });
    }

    return code;
  }

  async create(data: LocatorCreateDto): Promise<string> {
    const locator = this.locatorRepository.create({
      ...data,
      id: data?.id ?? (await this.generateLocatorCode()),
    });

    return await this.locatorRepository
      .save(locator)
      .then(() => {
        const msg = `Locator ${locator?.id} created as succesfily`;
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
