import { Installment } from 'src/tenant/contract/installment/installment.entity';

export interface TransactionCreateDto {
  category: 'rent' | 'generic';
  type: 'credit' | 'debit';
  amount: number;
  formOfPayment?: string;
  description?: string;
  data?: string | object;
  metadata?: string | object;
  installment?: Installment;
}
