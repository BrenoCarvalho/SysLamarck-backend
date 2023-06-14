import { ContractCreateDto } from './contract.create.dto';

export interface ContractEditDto extends ContractCreateDto {
  contractCode: number;
}
