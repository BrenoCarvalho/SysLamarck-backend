import { Bail } from 'src/bail/bail.entity';
import { ContractCreateDto } from 'src/contract/dto/contract.create.dto';
import { ResidentCreateDto } from 'src/resident/dto/resident.create.dto';

export interface TenantCreateDto {
  propertyId: number;
  propertyCode: string;
  fullName: string;
  birthDate: Date;
  rg: string;
  cpf: string;
  nationality: string;
  maritalStatus: string;
  profession: string;
  email: string;
  contact1: string;
  contact2: string;
  T2fullName?: string;
  T2birthDate?: Date;
  T2rg?: string;
  T2cpf?: string;
  T2nationality?: string;
  T2maritalStatus?: string;
  T2profession?: string;
  T2email?: string;
  T2contact1?: string;
  T2contact2?: string;
  residents?: ResidentCreateDto[];
  contract?: ContractCreateDto;
  bail?: Bail;
}
