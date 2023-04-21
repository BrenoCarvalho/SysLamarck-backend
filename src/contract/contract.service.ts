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

@Injectable()
export class ContractService {
  constructor(
    @Inject('CONTRACT_REPOSITORY')
    private contractRepository: Repository<Contract>,
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

  async delete(contractCode: number): Promise<number> {
    const response = await this.contractRepository.delete(contractCode);
    console.log('contract deleted as successfully');

    return response.affected;
  }

  async findOne(contractCode: number): Promise<Contract> {
    return this.contractRepository.findOneBy({ contractCode: contractCode });
  }

  async update(contractCode: number, data: ContractCreateDto): Promise<string> {
    const contract = await this.contractRepository.findOneBy({
      contractCode: contractCode,
    });

    if (!contract) {
      throw new NotFoundException(`Contract ${contractCode} not found`);
    }

    return this.contractRepository
      .update({ contractCode: contractCode }, data)
      .then(() => {
        const msg = `Contract ${contractCode} updated as successfuly`;
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

  async generateContractCode(): Promise<number> {
    const response = await this.contractRepository.find({
      select: { contractCode: true },
    });

    const contractsCode = [];

    response.map((value) => {
      contractsCode.push(value.contractCode);
    });

    let code = null;
    let stop = false;

    if (Math.min(...contractsCode) > 1) {
      code = 1;
    } else {
      contractsCode.map((value, index) => {
        if (!stop && contractsCode[index + 1] != value + 1) {
          code = value + 1;
          stop = true;
        }
      });
    }

    return code;
  }

  async create(data: ContractCreateDto): Promise<Contract> {
    const contract = new Contract();

    contract.contractCode = await this.generateContractCode();
    contract.applyDiscount = data.applyDiscount;
    contract.withholdingTax = data.withholdingTax;
    contract.goal = data.goal;
    contract.IPTUPayment = data.IPTUPayment;
    contract.index = data.index;
    contract.reajust = data.reajust;
    contract.integralValue = data.integralValue;
    contract.leaseAmount = data.leaseAmount;
    contract.duration = data.duration;
    contract.payday = data.payday;
    contract.start = data.start;
    contract.end = data.end;
    contract.firstPayment = data.firstPayment;

    return this.contractRepository
      .save(contract)
      .then(() => {
        const msg = `Contract ${contract.contractCode} created as succesfily`;
        console.log(msg);

        return contract;
      })
      .catch((error) => {
        console.log(error.driverError.sqlMessage);

        throw new HttpException(
          error.driverError.sqlMessage,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
