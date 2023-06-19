import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Transaction } from './transaction.entity';
import { TransactionCreateDto } from './dto/transaction.create.dto';
import { TransactionService } from './transaction.service';

const formatDate = (date: string | Date | null) => {
  const currentDate = new Date(date);
  if (currentDate.toString() === 'Invalid Date') return;

  const startTimeStringSplited = new Date(date)
    .toLocaleTimeString('pt-BR')
    .split(':');

  return new Date(
    Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      Number(startTimeStringSplited[0]),
      Number(startTimeStringSplited[1]),
      Number(startTimeStringSplited[2]),
    ),
  );
};

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/generic')
  async findAllGenericTransactions(
    @Query() query: any,
  ): Promise<Transaction[]> {
    const start = formatDate(query?.start);
    const end = formatDate(query?.end);

    return this.transactionService.findByCategory({
      category: 'generic',
      start,
      end,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/rent')
  async findAllRentTransactions(@Query() query: any): Promise<Transaction[]> {
    const start = formatDate(query?.start);
    const end = formatDate(query?.end);
    const allRelations = query?.allRelations ?? null;

    return this.transactionService.findByCategory({
      category: 'rent',
      start,
      end,
      allRelations,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: TransactionCreateDto): Promise<Transaction> {
    return await this.transactionService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params: any): Promise<number> {
    return await this.transactionService.delete(params.id);
  }
}
