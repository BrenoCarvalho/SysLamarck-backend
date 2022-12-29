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
import { Locator } from 'src/locator/locator.entity';
import { LocatorService } from 'src/locator/locator.service';

@Injectable()
export class PropertyService {
  constructor(
    @Inject('PROPERTY_REPOSITORY')
    private propertyRepository: Repository<Property>,
    private locatorService: LocatorService,
  ) {}

  async findAll(): Promise<Property[]> {
    return this.propertyRepository.find();
  }

  async delete(id: number): Promise<number> {
    return (await this.propertyRepository.delete(id)).affected;
  }

  async findOne(id: number): Promise<Property> {
    return this.propertyRepository.findOneBy({ id: id });
  }

  async update(id: number, data: PropertyCreateDto): Promise<string> {
    const property = await this.propertyRepository.findOneBy({ id: id });

    if (!property) {
      throw new NotFoundException(`Property ${id} not found`);
    }

    data.locatorName = await this.getLocatorName(data.locatorCode);

    return this.propertyRepository
      .update({ id: id }, data)
      .then(() => {
        const msg = `Property ${id} updated as successfuly`;
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

  async generatePropertyCode(): Promise<number> {
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

  async getLocatorName(locatorCode: number): Promise<string> {
    const locator: Locator = await this.locatorService.findOne(locatorCode);
    return locator?.fullName;
  }

  async create(data: PropertyCreateDto): Promise<string> {
    const property = new Property();

    property.id = await this.generatePropertyCode();
    property.locatorCode = data.locatorCode;
    property.locatorName = await this.getLocatorName(data.locatorCode);
    property.propertyType = data.propertyType;
    property.cep = data.cep;
    property.city = data.city;
    property.district = data.district;
    property.address = data.address;
    property.propertyDescription = data.propertyDescription;
    property.IPTUPayer = data.IPTUPayer;
    property.DIMOBDeclaration = data.DIMOBDeclaration;
    property.goalOfProperty = data.goalOfProperty;
    property.leaseFee = data.leaseFee;
    property.administrationTax = data.administrationTax;
    property.integralValue = data.integralValue;
    property.leaseAmount = data.leaseAmount;
    property.sellValue = data.sellValue;
    property.vacant = data.vacant;
    property.registrationValue = data.registrationValue;
    property.cityCode = data.cityCode;
    property.IPTUNumber = data.IPTUNumber;
    property.IntegralIPTUValue = data.IntegralIPTUValue;
    property.numberInstallments = data.numberInstallments;
    property.installmentsIPTUValue = data.installmentsIPTUValue;
    property.edpInstallation = data.edpInstallation;
    property.rgi = data.rgi;
    property.supply = data.supply;

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
