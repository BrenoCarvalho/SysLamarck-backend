import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { ContractCreateDto } from './dto/contract.create.dto';
import { Tenant } from 'src/tenant/tenant.entity';
import { InstallmentService } from './installment/installment.service';
import { BailService } from './bail/bail.service';

@Injectable()
export class ContractService {
  constructor(
    @Inject('CONTRACT_REPOSITORY')
    private contractRepository: Repository<Contract>,
    private installmentService: InstallmentService,
    private bailService: BailService,
  ) {}

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

  async update(id: number, data: ContractCreateDto): Promise<string> {
    let contract = await this.contractRepository.findOne({
      where: { id },
    });

    if (!contract) throw new NotFoundException(`Contract ${id} not found`);

    const contractArrayEntries = Object.entries(contract).map((item) => {
      return [item[0], data[item[0]] ? data[item[0]] : item[1]];
    });

    contract = Object.fromEntries(contractArrayEntries);

    return this.contractRepository
      .update({ id }, contract)
      .then(async () => {
        const msg = `Contract ${id} updated as successfuly`;
        console.log(msg);

        await this.bailService.update(contract.id, data);

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

  async updateCurrentInstallment(tenantId: number): Promise<number> {
    const installments = await this.installmentService.findByTenantId(tenantId);

    const currentInstallment = installments.filter(
      (installment) => installment.status === 'Dv',
    )[0];

    return (
      await this.contractRepository.update(
        { tenant: { id: tenantId } },
        {
          currentInstallment,
        },
      )
    ).affected;
  }

  async create(data: ContractCreateDto, tenant: Tenant): Promise<Contract> {
    const start = new Date();
    start.setDate(data?.payday);

    const end = new Date();
    end.setDate(data?.payday - 1);
    end.setMonth(start.getMonth() + data?.duration);

    const contract = this.contractRepository.create({
      ...data,
      tenant,
      duration: Number(data?.duration),
      payday: Number(data?.payday),
      gracePeriod: Number(data?.gracePeriod),
      start,
      end,
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
