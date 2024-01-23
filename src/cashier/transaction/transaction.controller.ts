import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Transaction } from './transaction.entity';
import { TransactionCreateDto } from './dto/transaction.create.dto';
import { TransactionService } from './transaction.service';
import { TransactionEditDto } from './dto/transaction.edit.dto';

@Controller('cashier/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/generic')
  async findAllGenericTransactions(
    @Query() query: any,
  ): Promise<Transaction[]> {
    return this.transactionService.findByCategory({
      category: 'generic',
      cashierId: query?.cashierId ?? null,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/rent')
  async findAllRentTransactions(@Query() query: any): Promise<Transaction[]> {
    const allRelations = query?.allRelations ?? null;

    return this.transactionService.findByCategory({
      category: 'rent',
      cashierId: query?.cashierId ?? null,
      allRelations,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: TransactionCreateDto): Promise<Transaction> {
    return await this.transactionService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param() params,
    @Body() data: TransactionEditDto,
  ): Promise<any> {
    if (!params['id']) throw new NotFoundException('missing id.');

    return await this.transactionService.update({
      id: params['id'],
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params: any): Promise<number> {
    return await this.transactionService.delete(params?.id);
  }
}
