import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tenant } from './tenant.entity';
import { TenantCreateDto } from './dto/tenant.create.dto';
import { PropertyService } from 'src/property/property.service';
import { ContractService } from './contract/contract.service';

@Injectable()
export class TenantService {
  constructor(
    @Inject('TENANT_REPOSITORY')
    private tenantRepository: Repository<Tenant>,
    private contractService: ContractService,
    private propertyService: PropertyService,
  ) {}

  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find({
      relations: { contract: true, property: true },
    });
  }

  async findOne(id: number): Promise<Tenant> {
    const response = await this.tenantRepository.findOne({
      where: { id },
      relations: ['contract', 'property', 'contract.bail'],
    });

    if (!response) return;

    response.residents = JSON?.parse(response?.residents);

    return response;
  }

  async findBy(by: object): Promise<Tenant[]> {
    return await this.tenantRepository.find({
      where: by,
      relations: { property: true },
    });
  }

  async delete(id: number): Promise<number> {
    return (await this.tenantRepository.delete(id)).affected;
  }

  async update(id: number, data: TenantCreateDto): Promise<string> {
    const tenant = await this.tenantRepository.findOne({
      where: { id },
      relations: { property: true, contract: true },
    });

    if (!tenant) throw new NotFoundException(`Tenant ${id} not found`);

    const tenantArrayEntries = Object.entries(tenant).map((item) => {
      return [item[0], data[item[0]] ? data[item[0]] : item[1]];
    });

    const newTenantData = {
      ...Object.fromEntries(tenantArrayEntries),
      property:
        data?.propertyCode &&
        data?.propertyCode != tenant?.property?.propertyCode
          ? await this.propertyService.findOneBy({
              propertyCode: data?.propertyCode,
            })
          : tenant.property,
      residents: JSON.stringify(data?.residents),
    };

    delete newTenantData['contract'];

    await this.contractService.update(tenant?.contract?.id, data);

    return this.tenantRepository
      .update({ id }, newTenantData)
      .then(async () => {
        const msg = `Tenant ${id} updated as successfuly`;
        console.log(msg);

        return msg;
      })
      .catch((error) => {
        console.log(error);

        throw new HttpException(
          error.driverError.sqlMessage,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async generateTenantId(): Promise<number> {
    const response = await this.tenantRepository.find({
      select: { id: true },
    });

    const tenantsCode = [];

    if (response?.length) {
      response.map((value) => {
        tenantsCode.push(value.id);
      });
    }

    let code = null;
    let stop = false;

    if (Math.min(...tenantsCode) > 1) {
      code = 1;
    } else {
      tenantsCode.map((value, index) => {
        if (!stop && tenantsCode[index + 1] != value + 1) {
          code = value + 1;
          stop = true;
        }
      });
    }

    return code;
  }

  async create(data: TenantCreateDto): Promise<Tenant> {
    const property = await this.propertyService.findOneBy({
      propertyCode: data?.propertyCode,
    });
    if (!property)
      throw new NotFoundException(`Property ${data?.propertyCode} not found`);

    const tenant = this.tenantRepository.create({
      ...data,
      id: await this.generateTenantId(),
      property,
      residents: JSON.stringify(data?.residents),
    });

    return this.tenantRepository
      .save(tenant)
      .then(async () => {
        const msg = `Tenant ${tenant.id} created as succesfily`;
        console.log(msg);

        await this.contractService.create(data, tenant);
        await this.propertyService.update(tenant?.property?.id, {
          vacant: false,
        });

        return tenant;
      })
      .catch(async (error) => {
        console.log(error);

        throw new HttpException(
          error.driverError.sqlMessage,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
