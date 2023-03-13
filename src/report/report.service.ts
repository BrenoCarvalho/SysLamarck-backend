import { Injectable } from '@nestjs/common';
import { ContractService } from 'src/contract/contract.service';
import { LocatorService } from 'src/locator/locator.service';
import { PropertyService } from 'src/property/property.service';
import { TenantService } from 'src/tenant/tenant.service';
import { Between } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(
    private propertyService: PropertyService,
    private tenantService: TenantService,
    private locatorService: LocatorService,
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
        locatorCode: locatorCode,
      },
    });

    const data = [];

    await Promise.all(
      properties.map(async (value) => {
        const tenant = (
          await this.tenantService.findBy({
            propertyCode: value?.propertyCode,
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
            contract: contract?.contractCode,
          })
        )[0];

        if (!tenant) {
          return;
        }

        const locatorCode = parseInt(tenant?.propertyCode.substring(0, 3));
        const locatorName = (await this.locatorService.findOne(locatorCode))
          ?.fullName;

        const propertyType = (
          await this.propertyService.findOneBy({
            propertyCode: tenant?.propertyCode,
          })
        )?.propertyType;

        data.push({
          propertyCode: tenant?.propertyCode,
          locatorName: locatorName,
          tenantName: tenant?.fullName,
          startContract: contract?.start,
          endContract: contract?.end,
          propertyType: propertyType,
        });
      }),
    );

    return data;
  }
}
