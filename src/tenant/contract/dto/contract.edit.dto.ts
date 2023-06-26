import { BailCreateDto } from '../bail/dto/bail.create.dto';
import { ContractCreateDto } from './contract.create.dto';

export interface ContractEditDto extends ContractCreateDto, BailCreateDto {
  contractCode: number;
}
