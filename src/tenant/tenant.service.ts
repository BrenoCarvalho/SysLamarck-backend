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
import { create as buildHtml } from 'puppeteer-html-pdf';
import RegistrationForm from 'src/templates/registrationForm';
import {
  currencyFormatter,
  dateFormatter,
  propertyCodeFormatter,
} from 'src/utils/formatters';

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

  generateRegistrationForm({ tenant }: { tenant: Tenant }): Promise<Buffer> {
    return buildHtml(
      RegistrationForm({
        locator: {
          id: `${tenant?.property?.locator?.id}`,
          fullName: tenant?.property?.locator?.fullName,
          accountNumber: tenant?.property?.locator?.accountNumber,
          accountType: tenant?.property?.locator?.accountType,
          address: tenant?.property?.locator?.address,
          agency: tenant?.property?.locator?.agency,
          bank: tenant?.property?.locator?.bank,
          birthDate: dateFormatter({
            value: tenant?.property?.locator?.birthDate,
          }),
          cep: tenant?.property?.locator?.cep,
          city: tenant?.property?.locator?.city,
          contact1: tenant?.property?.locator?.contact1,
          contact2: tenant?.property?.locator?.contact2,
          cpf: tenant?.property?.locator?.cpf,
          district: tenant?.property?.locator?.district,
          email: tenant?.property?.locator?.email,
          paymentRemittance: tenant?.property?.locator?.paymentRemittance,
          rg: tenant?.property?.locator?.rg,
        },
        property: {
          propertyCode: propertyCodeFormatter({
            value: tenant?.property?.propertyCode,
          }),
          edpInstallation: tenant?.property?.edpInstallation,
          rgi: tenant?.property?.rgi,
          supply: tenant?.property?.supply,
          cep: tenant?.property?.cep,
          address: tenant?.property?.address,
          city: tenant?.property?.city,
          district: tenant?.property?.district,
        },
        bail: {
          type: tenant?.contract?.bail?.type,
          addressG1: tenant?.contract?.bail?.addressG1,
          addressG2: tenant?.contract?.bail?.addressG2,
          birthDateG1: dateFormatter({
            value: tenant?.contract?.bail?.birthDateG1,
          }),
          birthDateG2: dateFormatter({
            value: tenant?.contract?.bail?.birthDateG2,
          }),
          cepG1: tenant?.contract?.bail?.cepG1,
          cepG2: tenant?.contract?.bail?.cepG2,
          cityG1: tenant?.contract?.bail?.cityG1,
          cityG2: tenant?.contract?.bail?.cityG2,
          contact1G1: tenant?.contract?.bail?.contact1G1,
          contact1G2: tenant?.contract?.bail?.contact1G2,
          contact2G1: tenant?.contract?.bail?.contact2G1,
          contact2G2: tenant?.contract?.bail?.contact2G2,
          cpfG1: tenant?.contract?.bail?.cpfG1,
          cpfG2: tenant?.contract?.bail?.cpfG2,
          districtG1: tenant?.contract?.bail?.districtG1,
          districtG2: tenant?.contract?.bail?.districtG2,
          emailG1: tenant?.contract?.bail?.emailG1,
          emailG2: tenant?.contract?.bail?.emailG2,
          fullNameG1: tenant?.contract?.bail?.fullNameG1,
          fullNameG2: tenant?.contract?.bail?.fullNameG2,
          rgG1: tenant?.contract?.bail?.rgG1,
          rgG2: tenant?.contract?.bail?.rgG2,
          spouseFullNameG1: tenant?.contract?.bail?.spouseFullNameG1,
          spouseFullNameG2: tenant?.contract?.bail?.spouseFullNameG2,
        },
        contract: {
          applyDiscount: tenant?.contract?.applyDiscount ? 'Sim' : 'Não',
          duration: `${tenant?.contract?.duration} Meses`,
          end: dateFormatter({ value: tenant?.contract?.end }),
          goal: tenant?.contract?.goal,
          index: tenant?.contract?.index,
          integralValue: currencyFormatter({
            value: tenant?.contract?.integralValue,
          }),
          leaseAmount: `${tenant?.contract?.leaseAmount}`,
          payday: `${tenant?.contract?.payday}`,
          reajust: tenant?.contract?.reajust,
          start: dateFormatter({ value: tenant?.contract?.start }),
        },
        tenant: {
          fullName: tenant?.fullName,
          birthDate: dateFormatter({ value: tenant?.birthDate }),
          contact1: tenant?.contact1,
          contact2: tenant?.contact2,
          cpf: tenant?.cpf,
          email: tenant?.email,
          rg: tenant?.rg,
        },
      }),
      { format: 'A4' },
    );
  }

  async registrationForm({ tenantId }: { tenantId: number }): Promise<Buffer> {
    const tenant = await this.tenantRepository.findOne({
      where: {
        id: tenantId,
      },
      relations: ['property', 'property.locator', 'contract', 'contract.bail'],
    });

    if (!tenant) throw new NotFoundException(`tenant ${tenantId} not found.`);

    return this.generateRegistrationForm({ tenant });
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
