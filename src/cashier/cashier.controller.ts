import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Cashier } from './cashier.entity';
import { CashierService } from './cashier.service';

@Controller('cashier')
export class CashierController {
  constructor(private readonly cashierService: CashierService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async openedCashier(): Promise<Cashier> {
    return await this.cashierService.openedCashier();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() params): Promise<Cashier> {
    return await this.cashierService.findOne(params?.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/cashiersClosedByDate/list')
  async getCashiersClosedByDate(@Query() query): Promise<Cashier[]> {
    const { date } = query;

    return await this.cashierService.getCashiersClosedByDate({ date });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/cashFlowReport')
  async getCashFlowReport(
    @Query() query,
    @Param() params,
    @Res() res,
  ): Promise<any> {
    const buffer = await this.cashierService.cashFlowReport({
      cashierId: +params.id,
    });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=fluxoDeCaixa.pdf`,
      'Content-Length': buffer?.length,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: 0,
    });

    res.end(buffer);
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/close')
  async close(): Promise<number> {
    return await this.cashierService.close();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/open')
  async open(): Promise<Cashier> {
    return await this.cashierService.open();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params: any): Promise<number> {
    return await this.cashierService.delete(params.id);
  }
}
