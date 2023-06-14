import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ContractService } from './contract.service';
import { Contract } from './contract.entity';
import { Installment } from './installment/installment.entity';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() params): Promise<Contract> {
    return this.contractService.findOne(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('installments/:id')
  async installments(@Param() params): Promise<Installment[]> {
    return await this.contractService.installments(params.id);
  }
}
