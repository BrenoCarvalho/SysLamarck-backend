import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { InstallmentService } from './installment.service';
import { Installment } from './installment.entity';
import { Transaction } from 'src/cashier/transaction/transaction.entity';

@Controller('tenant/:tenantId/contract/installment')
export class InstallmentController {
  constructor(private readonly installmentService: InstallmentService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Param() params: any): Promise<Installment[]> {
    return await this.installmentService.findByTenantId(params?.tenantId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':installmentId')
  async installment(@Param() params: any): Promise<Installment> {
    return await this.installmentService.findOne(params.installmentId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('pay')
  async pay(@Param() params: any, @Body() body: any): Promise<number> {
    const { amount, data, formOfPayment } = body;

    return await this.installmentService.pay({
      tenantId: params?.tenantId,
      amount,
      data,
      formOfPayment,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('transfer/:installmentId')
  async transfer(
    @Param() params: any,
    @Body() body: any,
  ): Promise<Transaction> {
    const { amount, data, formOfPayment } = body;

    return await this.installmentService.transfer({
      installmentId: params?.installmentId,
      amount,
      data,
      formOfPayment,
    });
  }
}
