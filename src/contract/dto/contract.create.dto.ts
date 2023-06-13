export interface ContractCreateDto {
  contractCode?: number;
  applyDiscount?: boolean;
  withholdingTax?: boolean;
  goal?: string;
  IPTUPayment?: string;
  index?: string;
  reajust?: string;
  integralValue?: number;
  leaseAmount: number;
  duration: number;
  payday: number;
}
