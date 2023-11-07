import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
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
    const { amount, data, formOfPayment, metadata } = body;

    return await this.installmentService.pay({
      tenantId: params?.tenantId,
      amount,
      data,
      metadata,
      formOfPayment,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('rollbackPayment/:installmentId')
  async rollbackPayment(@Param() params: any): Promise<number> {
    const { installmentId } = params;

    return await this.installmentService.rollbackPayment({
      installmentId: +installmentId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':installmentId/receipt')
  async receipt(
    @Param() params: any,
    @Query() query: any,
    @Res() res: any,
  ): Promise<any> {
    const buffer = await this.installmentService.receipt({
      installmentId: +params.installmentId,
      mode: query.mode,
    });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=recibo.pdf`,
      'Content-Length': buffer?.length,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: 0,
    });

    res.end(buffer);
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Post('rollbackPaymentTransfer/:installmentId')
  async rollbackPaymentTransfer(@Param() params: any): Promise<number> {
    const { installmentId } = params;

    return await this.installmentService.rollbackPaymentTransfer({
      installmentId: +installmentId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('transfer/:installmentId')
  async transfer(
    @Param() params: any,
    @Body() body: any,
  ): Promise<Transaction> {
    const { amount, data, formOfPayment, metadata } = body;

    return await this.installmentService.transfer({
      installmentId: params?.installmentId,
      amount,
      data,
      metadata,
      formOfPayment,
    });
  }
}
