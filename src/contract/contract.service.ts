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
import { RentService } from 'src/cashier/rent/rent.service';
import { Tenant } from 'src/tenant/tenant.entity';

@Injectable()
export class ContractService {
  constructor(
    @Inject('CONTRACT_REPOSITORY')
    private contractRepository: Repository<Contract>,
    private rentService: RentService,
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

  async findAll(): Promise<Contract[]> {
    return await this.contractRepository.find();
  }

  async find(condition: object) {
    return await this.contractRepository.find(condition);
  }

  async findBy(by: object): Promise<Contract[]> {
    return await this.contractRepository.findBy(by);
  }

  async delete(id: number): Promise<number> {
    const response = await this.contractRepository.delete(id);
    console.log('contract deleted as successfully');

    return response.affected;
  }

  async findOne(id: number): Promise<Contract> {
    return this.contractRepository.findOne({
      where: { id },
      relations: { tenant: true, rent: true },
    });
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

  async createInstallments(contract: Contract) {
    const currentDate = new Date();

    for (let month = 1; month <= contract.duration; month++) {
      const dueDate = currentDate;

      if (month != 1) {
        dueDate.setMonth(currentDate.getMonth() + month);
      }

      await this.rentService.create({
        contract: contract,
        installmentNumber: month,
        dueDate: dueDate,
        amount: contract.leaseAmount,
        status: 'Dv',
      });
    }
  }

  async create(data: ContractCreateDto, tenant: Tenant): Promise<Contract> {
    const contract = new Contract();

    contract.applyDiscount = data.applyDiscount;
    contract.withholdingTax = data.withholdingTax;
    contract.goal = data.goal;
    contract.IPTUPayment = data.IPTUPayment;
    contract.index = data.index;
    contract.reajust = data.reajust;
    contract.integralValue = data.integralValue;
    contract.leaseAmount = data.leaseAmount;
    contract.duration = Number(data.duration);
    contract.payday = data.payday;
    contract.start = new Date();
    // contract.end = data.end;
    contract.tenant = tenant;

    return await this.contractRepository
      .save(contract)
      .then(async () => {
        const msg = `Contract ${contract.id} created as succesfily`;
        console.log(msg);

        await this.createInstallments(contract);

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
