import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Property } from './property.entity';
import { PropertyCreateDto } from './dto/property.create.dto';
import { LocatorService } from 'src/locator/locator.service';

@Injectable()
export class PropertyService {
  constructor(
    @Inject('PROPERTY_REPOSITORY')
    private propertyRepository: Repository<Property>,
    private locatorService: LocatorService,
  ) {}

  async findAll(conditions?: any): Promise<Property[]> {
    return this.propertyRepository.find(conditions);
  }

  async findBy(by: object): Promise<Property[]> {
    return await this.propertyRepository.findBy(by);
  }

  async findOneBy(by: object): Promise<Property> {
    return JSON.stringify(by) != '{}'
      ? await this.propertyRepository.findOneBy(by)
      : null;
  }

  async delete(id: number): Promise<number> {
    return (await this.propertyRepository.delete(id)).affected;
  }

  async findOne(
    id: number,
    showLocator?: boolean,
    showTenant?: boolean,
  ): Promise<Property> {
    return this.propertyRepository.findOne({
      where: { id: id },
      relations: { locator: showLocator ?? false, tenant: showTenant ?? false },
    });
  }

  async update(id: number, data: PropertyCreateDto): Promise<string> {
    const property = await this.propertyRepository.findOneBy({ id: id });
    if (!property) throw new NotFoundException(`Property ${id} not found`);

    if (data?.locatorId) {
      const locator = await this.locatorService.findOne(data?.locatorId);
      if (!locator) throw new NotFoundException(`Locator ${id} not found`);

      delete data['locatorId'];
      delete data['propertyCode'];

      property.locator = locator;

      property.propertyCode = `${String(property?.locator?.id).padStart(
        3,
        '0',
      )}${String(property.property).padStart(3, '0')}`;
    }

    return this.propertyRepository
      .update({ id: id }, { ...property, ...data })
      .then(() => {
        const msg = `Property ${id} updated as successfuly`;
        console.log(msg);

        return msg;
      })
      .catch((error) => {
        console.log(error);

        throw new HttpException(
          error.driverError?.sqlMessage,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async generatePropertyId(): Promise<number> {
    const response = await this.propertyRepository.find({
      select: { id: true },
    });

    let propertyIds = [];

    response.map((value) => {
      propertyIds.push(value.id);
    });

    propertyIds = propertyIds.sort((a, b) => a - b);

    let id = null;
    let stop = false;

    if (Math.min(...propertyIds) > 1) {
      id = 1;
    } else {
      propertyIds.map((value, index) => {
        if (!stop && propertyIds[index + 1] != value + 1) {
          id = value + 1;
          stop = true;
        }
      });
    }

    return id;
  }

  async generateProperty(locatorId: number): Promise<number> {
    const response = await this.propertyRepository.findBy({
      locator: { id: locatorId },
    });

    const properties = [];

    response.map((value) => {
      properties.push(value.property);
    });

    return properties?.length ? Math.max(...properties) + 1 : 1;
  }

  async create(data: PropertyCreateDto): Promise<string> {
    const locator = await this.locatorService.findOne(data?.locatorId);
    if (!locator)
      throw new NotFoundException(`Locator ${data?.locatorId} not found`);

    const propertyNumber = data?.property
      ? data.property
      : await this.generateProperty(locator?.id);

    const propertyCode = `${String(data?.locatorId).padStart(3, '0')}${String(
      propertyNumber,
    ).padStart(3, '0')}`;

    const property = this.propertyRepository.create({
      ...data,
      id: await this.generatePropertyId(),
      locator,
      property: propertyNumber,
      propertyCode,
    });

    return this.propertyRepository
      .save(property)
      .then(() => {
        const msg = `Property ${property.id} created as succesfily`;
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
