import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { TransactionDataTemplate } from './dataTemplate.entity';
import { DataTemplateSaveDto } from './dto/dataTemplate.save.dto';
import { TenantService } from 'src/tenant/tenant.service';
import { Tenant } from 'src/tenant/tenant.entity';

@Injectable()
export class DataTemplateService {
  constructor(
    @Inject('TRANSACTIONDATATEMPLATE_REPOSITORY')
    private dataTemplateRepository: Repository<TransactionDataTemplate>,
    private tenantService: TenantService,
  ) {}

  async save(data: DataTemplateSaveDto): Promise<TransactionDataTemplate> {
    const tenant = await this.tenantService.findOne(data?.tenantId);
    if (!tenant) throw new NotFoundException(`No tenant found.`);

    const dataTemplate =
      (await this.load({
        tenantId: tenant?.id,
        type: data?.type,
      })) ?? null;

    if (dataTemplate) {
      await this.update({ id: dataTemplate?.id, data: data?.data });
      return this.dataTemplateRepository.findOneBy({ id: dataTemplate?.id });
    } else {
      return await this.create({ tenant, type: data?.type, data: data?.data });
    }
  }

  async load({
    tenantId,
    type,
  }: {
    tenantId: number;
    type: 'credit' | 'debit';
  }): Promise<TransactionDataTemplate> {
    tenantId = Number(tenantId) ?? null;
    if (!tenantId) throw new NotFoundException(`No tenant Id found.`);

    const dataTemplate =
      (await this.dataTemplateRepository.findOne({
        where: { tenant: { id: tenantId }, type },
      })) ?? null;

    if (dataTemplate) dataTemplate.data = JSON.parse(dataTemplate?.data);

    return dataTemplate;
  }

  async update({ id, data }: { id: number; data: object }): Promise<number> {
    return (
      await this.dataTemplateRepository.update(id, {
        data: JSON.stringify(data),
      })
    ).affected;
  }

  async create({
    tenant,
    type,
    data,
  }: {
    tenant: Tenant;
    type: 'credit' | 'debit';
    data: object;
  }): Promise<TransactionDataTemplate> {
    const dataTemplate = this.dataTemplateRepository.create({
      tenant: tenant,
      type,
      data: JSON.stringify(data),
    });

    return await this.dataTemplateRepository
      .save(dataTemplate)
      .then(() => {
        const msg = `Data template ${dataTemplate?.id} created as succesfily`;
        console.log(msg);

        return dataTemplate;
      })
      .catch((error) => {
        console.log(error);

        throw new HttpException(
          error.driverError.sqlMessage,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async delete(id: number): Promise<number> {
    return (await this.dataTemplateRepository.delete(id)).affected;
  }
}
