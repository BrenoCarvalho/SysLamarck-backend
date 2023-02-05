import { Injectable } from '@nestjs/common';
import { PropertyService } from 'src/property/property.service';

@Injectable()
export class ReportService {
  constructor(private propertyService: PropertyService) {}

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
}
