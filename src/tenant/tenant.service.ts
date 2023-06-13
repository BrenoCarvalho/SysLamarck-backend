import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tenant } from './tenant.entity';
import { TenantCreateDto } from './dto/tenant.create.dto';
import { ContractService } from 'src/contract/contract.service';
import { BailService } from 'src/bail/bail.service';
import { PropertyService } from 'src/property/property.service';

@Injectable()
export class TenantService {
  constructor(
    @Inject('TENANT_REPOSITORY')
    private tenantRepository: Repository<Tenant>,
    private contractService: ContractService,
    private bailService: BailService,
    @Inject(forwardRef(() => PropertyService))
    private propertyService: PropertyService,
  ) {}

  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find({
      relations: { contract: true, bail: true, property: true },
    });
  }

  async findOne(id: number): Promise<Tenant> {
    const response = await this.tenantRepository.findOne({
      where: { id },
      relations: { contract: true, bail: true, property: true },
    });

    response.residents = JSON.parse(response.residents);

    return response;
  }

  async findBy(by: object): Promise<Tenant[]> {
    return await this.tenantRepository.findBy(by);
  }

  async delete(id: number): Promise<number> {
    return (await this.tenantRepository.delete(id)).affected;
  }

  async update(id: number, data: TenantCreateDto): Promise<string> {
    const tenant = await this.tenantRepository.findOne({
      where: { id },
      relations: { bail: true, contract: true },
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant ${id} not found`);
    }

    await this.contractService.update(tenant?.contract?.id, {
      applyDiscount: data?.applyDiscount,
      withholdingTax: data?.withholdingTax,
      goal: data?.goal,
      IPTUPayment: data?.IPTUPayment,
      index: data?.index,
      reajust: data?.reajust,
      integralValue: data?.integralValue,
      leaseAmount: data?.leaseAmount,
      duration: data?.duration,
      payday: data?.payday,
      start: data?.start,
      end: data?.end,
      firstPayment: data?.firstPayment,
    });

    await this.bailService.update(tenant?.bail?.id, {
      type: data?.type,
      escrowValue: data?.escrowValue,
      warrantyTerm: data?.warrantyTerm,
      capitalizationTitle: data?.capitalizationTitle,
      fullNameG1: data?.fullNameG1,
      birthDateG1: data?.birthDateG1,
      rgG1: data?.rgG1,
      cpfG1: data?.cpfG1,
      nationalityG1: data?.nationalityG1,
      maritalStatusG1: data?.maritalStatusG1,
      professionG1: data?.professionG1,
      emailG1: data?.emailG1,
      contact1G1: data?.contact1G1,
      contact2G1: data?.contact2G1,
      cepG1: data?.cepG1,
      cityG1: data?.cityG1,
      districtG1: data?.districtG1,
      addressG1: data?.addressG1,
      spouseFullNameG1: data?.spouseFullNameG1,
      spouseBirthDateG1: data?.spouseBirthDateG1,
      spouseRgG1: data?.spouseRgG1,
      spouseCpfG1: data?.spouseCpfG1,
      spouseNationalityG1: data?.spouseNationalityG1,
      spouseProfessionG1: data?.spouseProfessionG1,
      spouseContact1G1: data?.spouseContact1G1,
      bailPropertyCepG1: data?.bailPropertyCepG1,
      bailPropertyCityG1: data?.bailPropertyCityG1,
      bailPropertyDistrictG1: data?.bailPropertyDistrictG1,
      bailPropertyAddressG1: data?.bailPropertyAddressG1,
      bailPropertyRegistrationNumberG1: data?.bailPropertyRegistrationNumberG1,
      fullNameG2: data?.fullNameG2,
      birthDateG2: data?.birthDateG2,
      rgG2: data?.rgG2,
      cpfG2: data?.cpfG2,
      nationalityG2: data?.nationalityG2,
      maritalStatusG2: data?.maritalStatusG2,
      professionG2: data?.professionG2,
      emailG2: data?.emailG2,
      contact1G2: data?.contact1G2,
      contact2G2: data?.contact2G2,
      cepG2: data?.cepG2,
      cityG2: data?.cityG2,
      districtG2: data?.districtG2,
      addressG2: data?.addressG2,
      spouseFullNameG2: data?.spouseFullNameG2,
      spouseBirthDateG2: data?.spouseBirthDateG2,
      spouseRgG2: data?.spouseRgG2,
      spouseCpfG2: data?.spouseCpfG2,
      spouseNationalityG2: data?.spouseNationalityG2,
      spouseProfessionG2: data?.spouseProfessionG2,
      spouseContact1G2: data?.spouseContact1G2,
      bailPropertyCepG2: data?.bailPropertyCepG2,
      bailPropertyCityG2: data?.bailPropertyCityG2,
      bailPropertyDistrictG2: data?.bailPropertyDistrictG2,
      bailPropertyAddressG2: data?.bailPropertyAddressG2,
      bailPropertyRegistrationNumberG2: data?.bailPropertyRegistrationNumberG2,
    });

    const newData = {
      fullName: data?.fullName,
      birthDate: data?.birthDate,
      rg: data?.rg,
      cpf: data?.cpf,
      nationality: data?.nationality,
      maritalStatus: data?.maritalStatus,
      profession: data?.profession,
      email: data?.email,
      contact1: data?.contact1,
      contact2: data?.contact2,
      fullNameT2: data?.fullNameT2,
      birthDateT2: data?.birthDateT2,
      rgT2: data?.rgT2,
      cpfT2: data?.cpfT2,
      nationalityT2: data?.nationalityT2,
      maritalStatusT2: data?.maritalStatusT2,
      professionT2: data?.professionT2,
      emailT2: data?.emailT2,
      contact1T2: data?.contact1T2,
      contact2T2: data?.contact2T2,
      residents: JSON.stringify(data?.residents),
    };

    return this.tenantRepository
      .update({ id }, newData)
      .then(() => {
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
    const tenant = new Tenant();

    tenant.id = await this.generateTenantId();
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
    tenant.fullNameT2 = data?.fullNameT2;
    tenant.birthDateT2 = data?.birthDateT2;
    tenant.rgT2 = data?.rgT2;
    tenant.cpfT2 = data?.cpfT2;
    tenant.nationalityT2 = data?.nationalityT2;
    tenant.maritalStatusT2 = data?.maritalStatusT2;
    tenant.professionT2 = data?.professionT2;
    tenant.emailT2 = data?.emailT2;
    tenant.contact1T2 = data?.contact1T2;
    tenant.contact2T2 = data?.contact2T2;
    tenant.residents = JSON.stringify(data?.residents);

    tenant.property = await this.propertyService.findOneBy({
      propertyCode: data?.propertyCode,
    });

    return this.tenantRepository
      .save(tenant)
      .then(async () => {
        const msg = `Tenant ${tenant.id} created as succesfily`;
        console.log(msg);

        await this.contractService.create(data, tenant);
        await this.bailService.create(data, tenant);

        await this.propertyService.update(
          (
            await this.propertyService.findOneBy({
              propertyCode: data?.propertyCode,
            })
          ).id,
          {
            vacant: false,
          },
        );

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
