import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
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
  @Get('/print')
  async receipt(
    @Param() params: any,
    @Query() query: any,
    @Res() res: any,
  ): Promise<any> {
    const { id } = params;

    const buffer = await this.contractService.print({ tenantId: +id });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=fichaDeCadastro.pdf`,
      'Content-Length': buffer?.length,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: 0,
    });

    res.end(buffer);
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Post('updateCurrentInstallment')
  async updateCurrentInstallment(@Param() params: any): Promise<number> {
    return await this.contractService.updateCurrentInstallment(
      params?.tenantId,
    );
  }
}
