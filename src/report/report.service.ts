import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { LocatorService } from 'src/locator/locator.service';
import { PropertyService } from 'src/property/property.service';
import { ContractService } from 'src/tenant/contract/contract.service';
import { TenantService } from 'src/tenant/tenant.service';
import { Between } from 'typeorm';
import { Contract } from 'src/tenant/contract/contract.entity';

@Injectable()
export class ReportService {
  constructor(
    private propertyService: PropertyService,
    @Inject(forwardRef(() => TenantService))
    private tenantService: TenantService,
    private locatorService: LocatorService,
    @Inject(forwardRef(() => ContractService))
    private contractService: ContractService,
  ) {}

  async propertyForSale(): Promise<any> {
    const properties = await this.propertyService.findAll({
      where: {
        goalOfProperty: 'Venda',
      },
    });

    const residential = properties.filter((obj) => {
      return obj.propertyType === 'Residencial';
    });

    const apartment = properties.filter((obj) => {
      return obj.propertyType === 'Apartamento';
    });

    const commercial = properties.filter((obj) => {
      return obj.propertyType === 'Comercial';
    });

    const terrain = properties.filter((obj) => {
      return obj.propertyType === 'Terreno';
    });

    return { residential, apartment, commercial, terrain };
  }

  async propertyVacant(): Promise<any> {
    const properties = await this.propertyService.findAll({
      where: {
        goalOfProperty: 'Aluguel',
        vacant: true,
      },
    });

    const residential = properties.filter((obj) => {
      return obj.propertyType === 'Residencial';
    });

    const apartment = properties.filter((obj) => {
      return obj.propertyType === 'Apartamento';
    });

    const commercial = properties.filter((obj) => {
      return obj.propertyType === 'Comercial';
    });

    const terrain = properties.filter((obj) => {
      return obj.propertyType === 'Terreno';
    });

    return { residential, apartment, commercial, terrain };
  }

  async propertyByLocator(locatorCode: number): Promise<any> {
    const locatorName = (await this.locatorService.findOne(locatorCode))
      ?.fullName;

    const properties = await this.propertyService.findAll({
      where: {
        locator: { id: locatorCode },
      },
    });

    const data = [];

    await Promise.all(
      properties.map(async (value) => {
        const tenant = (
          await this.tenantService.findBy({
            property: { propertyCode: value?.propertyCode },
          })
        )[0];

        const property = {
          propertyCode: value?.propertyCode,
          address: value?.address,
          district: value?.district,
          vacant: value?.vacant,
          tenant: tenant?.fullName,
        };

        data.push(property);
      }),
    );

    return {
      locatorCode: locatorCode,
      locatorName: locatorName,
      properties: data,
    };
  }

  async contractsByMonth(month: string, type: 'start' | 'end'): Promise<any> {
    const contracts = [];

    await Promise.all(
      (
        await this.contractService.findByMonth(month, type)
      )?.map(async (contract: Contract) => {
        const tenant = (
          await this.tenantService.findBy({
            contract: contract?.id,
          })
        )[0];

        contracts.push({
          locatorCode: Number(tenant.property.propertyCode.substring(0, 3)),
          propertyCode: tenant.property.propertyCode,
          fullName: tenant.fullName,
          index: contract.index,
          firstPayment: contract.start,
          reajust: contract.reajust,
          start: contract.start,
          end: contract.end,
          goal: contract.goal,
        });
      }),
    );

    return contracts;
  }

  async contractsByPeriod(
    startDate: string,
    endDate: string,
    mode: number,
  ): Promise<any> {
    const contracts = await this.contractService.findBy(
      mode == 1
        ? {
            start: Between(startDate, endDate),
          }
        : {
            end: Between(startDate, endDate),
          },
    );

    const data = [];

    await Promise.all(
      contracts?.map(async (contract) => {
        const tenant = (
          await this.tenantService.findBy({
            contract: contract?.id,
          })
        )[0];

        if (!tenant) {
          return;
        }

        const locatorCode = parseInt(
          tenant?.property.propertyCode.substring(0, 3),
        );
        const locatorName = (await this.locatorService.findOne(locatorCode))
          ?.fullName;

        const propertyType = (
          await this.propertyService.findOneBy({
            propertyCode: tenant?.property.propertyCode,
          })
        )?.propertyType;

        data.push({
          propertyCode: tenant?.property.propertyCode
            ? tenant?.property.propertyCode
            : 'Não definido',
          locatorName: locatorName ? locatorName : 'Não definido',
          tenantName: tenant?.fullName ? tenant?.fullName : 'Não definido',
          startContract: contract?.start ? contract?.start : 'Não definido',
          endContract: contract?.end ? contract?.end : 'Não definido',
          propertyType: propertyType ? propertyType : 'Não definido',
        });
      }),
    );

    return data;
  }

  async rgiEdp(): Promise<any> {
    const properties = await this.propertyService.findAll({
      relations: { locator: true },
    });
    const propertiesFormatted = [];

    await Promise.all(
      properties.map((value) => {
        propertiesFormatted.push({
          locator: value.locator.id,
          propertyCode: value.propertyCode,
          address: value.address,
          rgi: value.rgi,
          supply: value.supply,
          edpInstallation: value.edpInstallation,
        });
      }),
    );

    return propertiesFormatted;
  }

  async propertyTax(): Promise<any> {
    const properties = await this.propertyService.findAll({
      relations: { locator: true },
    });
    const data = [];

    await Promise.all(
      properties?.map(async (value) => {
        data.push({
          locator: value?.locator.id,
          propertyCode: value?.propertyCode,
          fullNameLocator: value.locator?.fullName,
          cpf: value.locator?.cpf,
          address: value?.address,
          iptu: value?.IPTUNumber,
        });
      }),
    );

    return data;
  }

  async registrationForm(tenantCode: number): Promise<any> {
    const tenant = await this.tenantService.findOne(tenantCode);

    const property = await this.propertyService.findOneBy({
      propertyCode: tenant.property.propertyCode,
    });

    const locator = await this.locatorService.findOne(
      Number(tenant.property.propertyCode.slice(0, 3)),
    );

    return { tenant, property, locator };
  }
}
