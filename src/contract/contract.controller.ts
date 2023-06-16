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
    const { type, amount, formOfPayment, data } = body;

    return await this.contractService.payInstallment(
      param?.contractId,
      type,
      amount,
      formOfPayment,
      data,
    );
  }
}
