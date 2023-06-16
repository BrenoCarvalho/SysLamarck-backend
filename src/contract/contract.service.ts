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
import { Installment } from './installment/installment.entity';

@Injectable()
export class ContractService {
  constructor(
    @Inject('CONTRACT_REPOSITORY')
    private contractRepository: Repository<Contract>,
    private installmentService: InstallmentService,
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

  async installments(id: number): Promise<Installment[]> {
    return this.installmentService.findByContractId(id);
  }

  async findAll(): Promise<Contract[]> {
    return await this.contractRepository.find();
  }

  async find(condition: object) {
    return await this.contractRepository.find(condition);
  }

  async findBy(by: object): Promise<Contract[]> {
    return await this.contractRepository.findBy(by);
  }

  async findOne(id: number): Promise<Contract> {
    return this.contractRepository.findOne({
      where: { id },
      relations: { tenant: true, installment: true },
    });
  }

  async delete(id: number): Promise<number> {
    const response = await this.contractRepository.delete(id);
    console.log('contract deleted as successfully');

    return response?.affected;
  }

  async update(id: number, data: ContractCreateDto): Promise<string> {
    const contract = await this.contractRepository.findOneBy({
      id,
    });

    if (!contract) {
      throw new NotFoundException(`Contract ${id} not found`);
    }

    return this.contractRepository
      .update({ id }, data)
      .then(() => {
        const msg = `Contract ${id} updated as successfuly`;
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

  async updateCurrentInstallment(contractId: number): Promise<number> {
    const installments = await this.installmentService.findByContractId(
      contractId,
    );

    const currentInstallment = installments.filter(
      (installment) => installment.status === 'Dv',
    )[0];

    return (
      await this.contractRepository.update(contractId, {
        currentInstallment,
      })
    ).affected;
  }

  async create(data: ContractCreateDto, tenant: Tenant): Promise<Contract> {
    const contract = new Contract();

    contract.applyDiscount = data?.applyDiscount;
    contract.withholdingTax = data?.withholdingTax;
    contract.goal = data?.goal;
    contract.IPTUPayment = data?.IPTUPayment;
    contract.index = data?.index;
    contract.reajust = data?.reajust;
    contract.integralValue = data?.integralValue;
    contract.leaseAmount = data?.leaseAmount;
    contract.duration = Number(data?.duration);
    contract.payday = Number(data?.payday);
    contract.gracePeriod = Number(data?.gracePeriod);

    contract.start = new Date();
    contract.start.setDate(contract.payday);

    contract.end = new Date();
    contract.end.setDate(contract.payday - 1);
    contract.end.setMonth(contract.start.getMonth() + contract.duration);

    contract.tenant = tenant;

    return await this.contractRepository
      .save(contract)
      .then(async () => {
        const msg = `Contract ${contract?.id} created as succesfily`;
        console.log(msg);

        await this.installmentService.generateInstallments(contract);
        await this.updateCurrentInstallment(contract?.id);

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
