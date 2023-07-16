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
import { TransactionDataTemplate } from './dataTemplate.entity';
import { DataTemplateSaveDto } from './dto/dataTemplate.save.dto';
import { DataTemplateService } from './dataTemplate.service';

@Controller('cashier/transaction/dataTemplate')
export class DataTemplateController {
  constructor(private readonly dataTemplateService: DataTemplateService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:tenantId')
  async load(
    @Param() params: any,
    @Query() query: any,
  ): Promise<TransactionDataTemplate> {
    return this.dataTemplateService.load({
      tenantId: params?.tenantId,
      type: query?.type,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async save(
    @Body() data: DataTemplateSaveDto,
  ): Promise<TransactionDataTemplate> {
    return await this.dataTemplateService.save(data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params: any): Promise<number> {
    return await this.dataTemplateService.delete(params?.id);
  }
}
