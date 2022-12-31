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
import { ContractService } from 'src/contract/contract.service';
import { BailService } from 'src/bail/bail.service';
import { ResidentService } from 'src/resident/resident.service';

@Injectable()
export class TenantService {
  constructor(
    @Inject('TENANT_REPOSITORY')
    private tenantRepository: Repository<Tenant>,
    private contractService: ContractService,
    private bailService: BailService,
    private residentService: ResidentService,
  ) {}

  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }

  async findBy(by: object): Promise<Tenant[]> {
    return await this.tenantRepository.findBy(by);
  }

  async delete(tenantCode: number): Promise<number> {
    const tenant = await this.findOne(tenantCode);

    tenant?.residents.map(async (value) => {
      await this.residentService.delete(value);
    });

    const contracts = await this.contractService.findBy({
      contractCode: tenant?.contractCode,
    });

    contracts.map(async (value) => {
      await this.contractService.delete(value.contractCode);
    });

    const bails = await this.bailService.findBy({
      bailCode: tenant?.bailCode,
    });

    bails.map(async (value) => {
      await this.bailService.delete(value.bailCode);
    });

    return (await this.tenantRepository.delete(tenantCode)).affected;
  }

  async findOne(tenantCode: number): Promise<Tenant> {
    return this.tenantRepository.findOneBy({ tenantCode: tenantCode });
  }

  async update(tenantCode: number, data: TenantCreateDto): Promise<string> {
    const tenant = await this.tenantRepository.findOneBy({
      tenantCode: tenantCode,
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant ${tenantCode} not found`);
    }

    await this.contractService.update(
      data?.contract.contractCode,
      data?.contract,
    );

    await this.bailService.update(data?.bail.bailCode, data?.bail);

    data?.residents.map(async (value) => {
      await this.residentService.update(value.residentCode, value);
    });

    const { residents, contract, bail, ...newData } = data;

    return this.tenantRepository
      .update({ tenantCode: tenantCode }, newData)
      .then(() => {
        const msg = `Tenant ${tenantCode} updated as successfuly`;
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

  async generateTenantCode(): Promise<number> {
    const response = await this.tenantRepository.find({
      select: { tenantCode: true },
    });

    const tenantsCode = [];

    response.map((value) => {
      tenantsCode.push(value.tenantCode);
    });

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

  async create(data: TenantCreateDto): Promise<string> {
    const tenant = new Tenant();

    tenant.tenantCode = await this.generateTenantCode();
    tenant.propertyId = data?.propertyId;
    tenant.propertyCode = data?.propertyCode;
    tenant.fullName = data?.fullName;
    tenant.birthDate = data?.birthDate;
    tenant.rg = data?.rg;
    tenant.cpf = data?.cpf;
    tenant.nationality = data?.nationality;
    tenant.maritalStatus = data?.maritalStatus;
    tenant.profession = data?.profession;
    tenant.email = data?.email;
    tenant.contact1 = data?.contact1;
    tenant.contact2 = data?.contact2;
    tenant.T2fullName = data?.T2fullName;
    tenant.T2birthDate = data?.T2birthDate;
    tenant.T2rg = data?.T2rg;
    tenant.T2cpf = data?.T2cpf;
    tenant.T2nationality = data?.T2nationality;
    tenant.T2maritalStatus = data?.T2maritalStatus;
    tenant.T2profession = data?.T2profession;
    tenant.T2email = data?.T2email;
    tenant.T2contact1 = data?.T2contact1;
    tenant.T2contact2 = data?.T2contact2;

    const residentsCode = [];

    data?.residents.map(async (value) => {
      residentsCode.push(
        (await this.residentService.create(value)).residentCode,
      );
    });

    tenant.residents = residentsCode;

    tenant.contractCode = await (
      await this.contractService.create(data?.contract)
    ).contractCode;

    tenant.bailCode = await (
      await this.bailService.create(data?.bail)
    ).bailCode;

    return this.tenantRepository
      .save(tenant)
      .then(() => {
        const msg = `Tenant ${tenant.tenantCode} created as succesfily`;
        console.log(msg);

        return msg;
      })
      .catch(async (error) => {
        console.log(error.driverError.sqlMessage);

        await this.contractService.delete(tenant?.contractCode);
        await this.bailService.delete(tenant?.bailCode);

        throw new HttpException(
          error.driverError.sqlMessage,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
