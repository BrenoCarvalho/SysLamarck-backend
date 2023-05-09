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

  // async findAll(conditions?: any): Promise<Property[]> {
  //   return this.propertyRepository.find(conditions);
  // }

  // async findBy(by: object): Promise<Property[]> {
  //   return await this.propertyRepository.findBy(by);
  // }

  // async findOneBy(by: object): Promise<Property> {
  //   return JSON.stringify(by) != '{}'
  //     ? await this.propertyRepository.findOneBy(by)
  //     : null;
  // }

  // async delete(id: number): Promise<number> {
  //   const propertyCode = await (
  //     await this.propertyRepository.findOneBy({ id })
  //   ).propertyCode;

  //   const tenants = await this.tenantService.findBy({
  //     propertyCode: propertyCode,
  //   });

  //   tenants.map(async (value) => {
  //     await this.tenantService.delete(value?.tenantCode);
  //   });

  //   return (await this.propertyRepository.delete(id)).affected;
  // }

  // async findOne(id: number): Promise<Property> {
  //   return this.propertyRepository.findOneBy({ id: id });
  // }

  // async update(id: number, data: PropertyCreateDto): Promise<string> {
  //   const property = await this.propertyRepository.findOneBy({ id: id });

  //   if (!property) {
  //     throw new NotFoundException(`Property ${id} not found`);
  //   }

  //   data.locatorName = await this.getLocatorName(data.locatorCode);

  //   data.propertyCode = `${String(data.locatorCode).padStart(3, '0')}${String(
  //     property.property,
  //   ).padStart(3, '0')}`;

  //   return this.propertyRepository
  //     .update({ id: id }, data)
  //     .then(() => {
  //       const msg = `Property ${id} updated as successfuly`;
  //       console.log(msg);

  //       return msg;
  //     })
  //     .catch((error) => {
  //       console.log(error.driverError.sqlMessage);

  //       throw new HttpException(
  //         error.driverError.sqlMessage,
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     });
  // }

  // async generatePropertyId(): Promise<number> {
  //   const response = await this.propertyRepository.find({
  //     select: { id: true },
  //   });

  //   const propertyCode = [];

  //   response.map((value) => {
  //     propertyCode.push(value.id);
  //   });

  //   let code = null;
  //   let stop = false;

  //   if (Math.min(...propertyCode) > 1) {
  //     code = 1;
  //   } else {
  //     propertyCode.map((value, index) => {
  //       if (!stop && propertyCode[index + 1] != value + 1) {
  //         code = value + 1;
  //         stop = true;
  //       }
  //     });
  //   }

  //   return code;
  // }

  // async generateProperty(locatorCode: number): Promise<number> {
  //   const response = await this.propertyRepository.findBy({ locatorCode });

  //   const properties = [];

  //   response.map((value) => {
  //     properties.push(value.property);
  //   });

  //   return properties.length ? Math.max(...properties) + 1 : 1;
  // }

  // async getLocatorName(locatorCode: number): Promise<string> {
  //   const locator: Locator = await this.locatorService.findOne(locatorCode);
  //   return locator?.fullName;
  // }

  async findAll(conditions?: any): Promise<Movimentation[]> {
    return this.movimentationRepository.find(conditions);
  }

  async create(data: MovimentationCreateDto): Promise<string> {
    const movimentation = new Movimentation();

    movimentation.description = data?.description;
    movimentation.date = data?.date;
    movimentation.credit = Number(data?.credit) || null;
    movimentation.debit = Number(data?.debit) || null;

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
