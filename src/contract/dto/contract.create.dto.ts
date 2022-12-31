export interface ContractCreateDto {
  contractCode: number;
  applyDiscount: boolean;
  withholdingTax: boolean;
  goal: string;
  IPTUPayment: string;
  index: string;
  reajust: string;
  integralValue: string;
  leaseAmount: string;
  duration: string;
  payday: string;
  start: Date;
  end: Date;
}
