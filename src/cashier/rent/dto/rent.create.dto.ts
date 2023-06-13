import { Contract } from 'src/contract/contract.entity';

export interface RentCreateDto {
  contract: Contract;
  installmentNumber: number;
  dueDate: Date;
  amount: number;
  status: string;
}
