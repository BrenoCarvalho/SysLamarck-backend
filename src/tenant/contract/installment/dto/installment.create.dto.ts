import { Contract } from '../../contract.entity';

export interface InstallmentCreateDto {
  contract: Contract;
  currentInstallment: string;
  dueDate: Date;
  amount: number;
  status: 'Pg' | 'Dv' | 'Ca';
}
