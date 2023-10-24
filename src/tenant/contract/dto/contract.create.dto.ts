import { BailCreateDto } from '../bail/dto/bail.create.dto';

export interface ContractCreateDto extends BailCreateDto {
  applyDiscount?: boolean;
  withholdingTax?: boolean;
  goal: string;
  IPTUPayment: string;
  index?: string;
  reajust?: string;
  integralValue?: number;
  leaseAmount: number;
  duration: number;
  payday: number;
  gracePeriod?: number;
  installmentsPaid?: number;
}
