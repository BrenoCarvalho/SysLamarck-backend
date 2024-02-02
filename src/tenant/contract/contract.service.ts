import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { ContractCreateDto } from './dto/contract.create.dto';
import { Tenant } from 'src/tenant/tenant.entity';
import { InstallmentService } from './installment/installment.service';
import { BailService } from './bail/bail.service';
import { create as buildHtml } from 'puppeteer-html-pdf';
import { TenantService } from '../tenant.service';
import ContractToPrint from 'src/templates/contract';

@Injectable()
export class ContractService {
  constructor(
    @Inject('CONTRACT_REPOSITORY')
    private contractRepository: Repository<Contract>,
    private installmentService: InstallmentService,
    private bailService: BailService,
    @Inject(forwardRef(() => TenantService))
    private tenantService: TenantService,
  ) {}

  async findBy(conditionals): Promise<Contract[]> {
    return await this.contractRepository.findBy(conditionals);
  }

  async findByMonth(
    month: string | number,
    type: 'start' | 'end',
  ): Promise<any> {
    return await this.contractRepository
      .createQueryBuilder()
      .where(`MONTH(${type}) = :month`, { month })
      .getMany();
  }

  async findOneByTenantId({
    tenantId,
    showBail = false,
    showAllInstallments = false,
    showCurrentInstallment = false,
  }: {
    tenantId: number;
    showBail?: boolean;
    showAllInstallments?: boolean;
    showCurrentInstallment?: boolean;
  }): Promise<Contract> {
    if (!tenantId) return;

    return this.contractRepository.findOne({
      where: { tenant: { id: tenantId } },
      relations: {
        bail: showBail,
        installment: showAllInstallments,
        currentInstallment: showCurrentInstallment,
      },
    });
  }

  async print({ tenantId }: { tenantId: number }): Promise<Buffer> {
    const tenant = await this.tenantService.findOne(tenantId);

    return buildHtml(
      ContractToPrint({
        tenant,
        bail: tenant.contract.bail,
        contract: tenant.contract,
        property: tenant.property,
        locator: tenant.property.locator,
      }),
      {
        format: 'A4',
      },
    );
  }

  async update(id: number, data: ContractCreateDto): Promise<string> {
    let contract = await this.contractRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });

    await this.bailService.update(Number(contract.bail), data);

    if (!contract) throw new NotFoundException(`Contract ${id} not found`);

    const contractArrayEntries = Object.entries(contract).map((item) => {
      return [item[0], data[item[0]] ? data[item[0]] : item[1]];
    });

    contract = Object.fromEntries(contractArrayEntries);
    delete contract['bail'];
    delete contract['installment'];

    return this.contractRepository
      .update({ id }, { ...contract })
      .then(async () => {
        const msg = `Contract ${id} updated as successfuly`;
        console.log(msg);

        await this.installmentService.update(contract);

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

  async renewal(tenantId: number): Promise<Contract> {
    let contract = await this.contractRepository.findOneBy({
      tenant: { id: tenantId },
    });

    const start = contract.end;
    start.setDate(start.getDate() + 1);

    const end = new Date(start);
    end.setMonth(end.getMonth() + Number(contract.duration));
    end.setDate(end.getDate() - 1);

    await this.contractRepository.update(
      { id: contract.id },
      {
        start,
        end,
        contractRenewal: contract?.contractRenewal + 1,
        activated: true,
      },
    );

    contract = await this.contractRepository.findOneBy({
      tenant: { id: tenantId },
    });

    await this.installmentService.generateInstallments(contract);
    await this.updateCurrentInstallment(tenantId);

    return contract;
  }

  async finalizeContract({
    contractId,
    tenantId,
  }: {
    contractId?: number;
    tenantId?: number;
  }) {
    if (contractId)
      await this.contractRepository.update(
        { id: contractId },
        { activated: false },
      );
    else
      await this.contractRepository.update(
        { tenant: { id: tenantId } },
        { activated: false },
      );
  }

  async updateCurrentInstallment(tenantId: number): Promise<number> {
    const installments = await this.installmentService.findByTenantId(tenantId);

    const unpaidInstallments = installments
      .filter((installment) => installment.status === 'Dv')
      .sort(
        (a, b) =>
          Number(a.currentInstallment.split('/')[0]) -
          Number(b.currentInstallment.split('/')[0]),
      );

    if (unpaidInstallments?.length > 0)
      return (
        await this.contractRepository.update(
          { tenant: { id: tenantId } },
          {
            currentInstallment: unpaidInstallments[0],
          },
        )
      ).affected;
    else {
      await this.finalizeContract({ tenantId });
    }
  }

  async create(data: ContractCreateDto, tenant: Tenant): Promise<Contract> {
    const [year, month, date] = data?.start?.split('-');

    const start = new Date(+year, +month - 1, +date);
    start.setDate(+data?.payday);

    const end = new Date(start);
    end.setMonth(end.getMonth() + Number(data.duration));
    end.setDate(end.getDate() - 1);

    const contract = this.contractRepository.create({
      ...data,
      tenant,
      activated: true,
      duration: Number(data?.duration),
      payday: Number(data?.payday),
      gracePeriod: Number(data?.gracePeriod),
      installmentsPaid: Number(data?.installmentsPaid),
      contractRenewal: 0,
      start,
      end,
      startFirstContract: start,
      endFirstContract: end,
    });

    return await this.contractRepository
      .save(contract)
      .then(async () => {
        const msg = `Contract ${contract?.id} created as succesfily`;
        console.log(msg);

        await this.bailService.create(data, contract);
        await this.installmentService.generateInstallments(contract);
        await this.updateCurrentInstallment(tenant?.id);

        return contract;
      })
      .catch((error) => {
        console.log(error);

        throw new HttpException(
          error.driverError.sqlMessage,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
