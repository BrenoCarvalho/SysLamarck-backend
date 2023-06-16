import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Transaction } from './transaction.entity';
import { TransactionCreateDto } from './dto/transaction.create.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/generic')
  async findAll(): Promise<Transaction[]> {
    return this.transactionService.findAllByCategory('generic');
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: TransactionCreateDto): Promise<Transaction> {
    return await this.transactionService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params): Promise<number> {
    return await this.transactionService.delete(params.id);
  }
}
