import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Installment } from './installment.entity';
import { InstallmentCreateDto } from './dto/installment.create.dto';
import { Contract } from '../contract.entity';

const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

@Injectable()
export class InstallmentService {
  constructor(
    @Inject('INSTALLMENT_REPOSITORY')
    private installmentRepository: Repository<Installment>,
  ) {}

  async findOne(id: number): Promise<Installment> {
    const installment = await this.installmentRepository.findOne({
      where: { id },
      relations: { transaction: true },
    });

    installment?.transaction?.map(
      (transaction) =>
        (installment.transaction[
          installment.transaction.indexOf(transaction)
        ].data = JSON?.parse(transaction.data)),
    );

    return installment;
  }

  async findByContractId(id: number): Promise<Installment[]> {
    return await this.installmentRepository.find({
      where: { contract: { id } },
      loadRelationIds: true,
      relations: {
        transaction: true,
      },
    });
  }

  async generateInstallments(contract: Contract) {
    for (let month = 1; month <= contract?.duration; month++) {
      const dueDate = new Date();

      dueDate.setDate(contract?.payday);
      dueDate.setMonth(dueDate.getMonth() + month);

      await this.create({
        contract: contract,
        currentInstallment: `${month}/${contract?.duration}`,
        dueDate: dueDate,
        amount: contract?.leaseAmount,
        status: month <= contract?.gracePeriod ? 'Ca' : 'Dv',
      });
    }
  }

  async pay(installmentId: number): Promise<number> {
    return (
      await this.installmentRepository.update(installmentId, { status: 'Pg' })
    ).affected;
  }

  async create(data: InstallmentCreateDto): Promise<Installment> {
    const installment = new Installment();

    const referenceMonthIndex =
      data?.dueDate?.getMonth() == 0
        ? monthNames?.length - 1
        : data?.dueDate?.getMonth() - 1;

    installment.contract = data?.contract;
    installment.currentInstallment = data?.currentInstallment;
    installment.dueDate = data?.dueDate;
    installment.referenceMonth = monthNames[referenceMonthIndex];
    installment.amount = data?.amount;
    installment.status = data?.status;

    return await this.installmentRepository
      .save(installment)
      .then(() => {
        const msg = `Installment ${installment?.id} created as succesfily`;
        console.log(msg);

        return installment;
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
