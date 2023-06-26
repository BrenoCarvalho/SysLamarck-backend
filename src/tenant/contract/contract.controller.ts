import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ContractService } from './contract.service';
import { Contract } from './contract.entity';

@Controller('tenant/:tenantId/contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOne(@Param() params: any, @Query() query: any): Promise<Contract> {
    return this.contractService.findOneByTenantId({
      tenantId: Number(params?.tenantId),
      showBail: !!Number(query?.showBail),
      showAllInstallments: !!Number(query?.showAllInstallments),
      showCurrentInstallment: !!Number(query?.showCurrentInstallment),
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('updateCurrentInstallment')
  async updateCurrentInstallment(@Param() params: any): Promise<number> {
    return await this.contractService.updateCurrentInstallment(
      params?.tenantId,
    );
  }
}
