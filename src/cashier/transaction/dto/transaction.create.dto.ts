import { Rent } from 'src/cashier/rent/rent.entity';

export interface TransactionCreateDto {
  rent?: Rent;
  category: 'rent' | 'generic';
  type: 'credit' | 'debit';
  amount: number;
  formOfPayment?: string;
  description?: string;
  data?: string;
}
