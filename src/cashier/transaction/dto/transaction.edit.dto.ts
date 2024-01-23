import { Installment } from 'src/tenant/contract/installment/installment.entity';

export interface TransactionEditDto {
  amount: number;
  formOfPayment?: string;
  description?: string;
  data?: string | object;
  metadata?: string | object;
  installment?: Installment;
}
