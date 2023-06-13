import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Property } from './property.entity';
import { PropertyCreateDto } from './dto/property.create.dto';
import { Locator } from 'src/locator/locator.entity';
import { LocatorService } from 'src/locator/locator.service';

@Injectable()
export class PropertyService {
  constructor(
    @Inject('PROPERTY_REPOSITORY')
    private propertyRepository: Repository<Property>,

    @Inject(forwardRef(() => LocatorService))
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

    const locator = await this.locatorService.findOne(data.locatorId);
    if (!locator) throw new NotFoundException(`Locator ${id} not found`);

    delete data['locatorId'];

    data.propertyCode = `${String(locator?.id).padStart(3, '0')}${String(
      property.property,
    ).padStart(3, '0')}`;

    return this.propertyRepository
      .update({ id: id }, { locator, ...data })
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

    const propertyCode = [];

    response.map((value) => {
      propertyCode.push(value.id);
    });

    let code = null;
    let stop = false;

    if (Math.min(...propertyCode) > 1) {
      code = 1;
    } else {
      propertyCode.map((value, index) => {
        if (!stop && propertyCode[index + 1] != value + 1) {
          code = value + 1;
          stop = true;
        }
      });
    }

    return code;
  }

  async generateProperty(locator: Locator): Promise<number> {
    const response = await this.propertyRepository.findBy({ locator });

    const properties = [];

    response.map((value) => {
      properties.push(value.property);
    });

    return properties?.length ? Math.max(...properties) + 1 : 1;
  }

  async create(data: PropertyCreateDto): Promise<string> {
    const property = new Property();

    property.id = await this.generatePropertyId();
    property.locator = await this.locatorService.findOne(data?.locatorId);
    property.property = data?.property
      ? data.property
      : await this.generateProperty(property.locator);
    property.propertyCode = `${String(data?.locatorId).padStart(
      3,
      '0',
    )}${String(property.property).padStart(3, '0')}`;
    property.propertyType = data?.propertyType;
    property.cep = data?.cep;
    property.city = data?.city;
    property.district = data?.district;
    property.address = data?.address;
    property.propertyDescription = data?.propertyDescription;
    property.IPTUPayer = data?.IPTUPayer;
    property.DIMOBDeclaration = data?.DIMOBDeclaration;
    property.goalOfProperty = data?.goalOfProperty;
    property.leaseFee = data?.leaseFee;
    property.administrationTax = data?.administrationTax;
    property.integralValue = data?.integralValue;
    property.leaseAmount = data?.leaseAmount;
    property.sellValue = data?.sellValue;
    property.vacant = data?.vacant;
    property.registrationNumber = data?.registrationNumber;
    property.cityCode = data?.cityCode;
    property.IPTUNumber = data?.IPTUNumber;
    property.IntegralIPTUValue = data?.IntegralIPTUValue;
    property.numberInstallments = data?.numberInstallments;
    property.installmentsIPTUValue = data?.installmentsIPTUValue;
    property.edpInstallation = data?.edpInstallation;
    property.rgi = data?.rgi;
    property.supply = data?.supply;

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
