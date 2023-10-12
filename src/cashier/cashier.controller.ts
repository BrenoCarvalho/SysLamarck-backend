import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
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
  @Get('/getCashiersClosedByDate')
  async getCashiersClosedByDate(@Query() query): Promise<Cashier[]> {
    const { date } = query;

    return await this.cashierService.getCashiersClosedByDate({ date });
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
