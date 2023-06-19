import { Installment } from 'src/contract/installment/installment.entity';

export interface TransactionCreateDto {
  category: 'rent' | 'generic';
  type: 'credit' | 'debit';
  amount: number;
  formOfPayment?: string;
  description?: string;
  data?: string;
  installment?: Installment;
}
