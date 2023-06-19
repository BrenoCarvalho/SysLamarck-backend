import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ContractService } from './contract.service';
import { Contract } from './contract.entity';
import { Installment } from './installment/installment.entity';
import { Transaction } from 'src/transaction/transaction.entity';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() params: any, @Query() query: any): Promise<Contract> {
    return this.contractService.findOne(
      params.id,
      !!Number(query?.showTenant),
      !!Number(query?.showAllInstallments),
      !!Number(query?.showCurrentInstallment),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('installment/:id')
  async installment(@Param() params: any): Promise<Installment> {
    return await this.contractService.getInstallment(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('installments/:contractId')
  async installments(@Param() params: any): Promise<Installment[]> {
    return await this.contractService.installments(params.contractId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('updateCurrentInstallment/:contractId')
  async updateCurrentInstallment(@Param() params: any): Promise<number> {
    return await this.contractService.updateCurrentInstallment(
      params?.contractId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('payInstallment/:contractId')
  async payInstallment(
    @Param() param: any,
    @Body() body: any,
  ): Promise<number> {
    const { amount, data, formOfPayment } = body;

    return await this.contractService.payInstallment({
      contractId: param?.contractId,
      amount,
      data,
      formOfPayment,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('transferRent/:installmentId')
  async transferRent(
    @Param() param: any,
    @Body() body: any,
  ): Promise<Transaction> {
    const { amount, data, formOfPayment } = body;

    return await this.contractService.transferRent({
      installmentId: param?.installmentId,
      amount,
      data,
      formOfPayment,
    });
  }
}
