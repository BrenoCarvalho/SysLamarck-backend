import { Bail } from 'src/bail/bail.entity';
import { ContractCreateDto } from 'src/contract/dto/contract.create.dto';
import { ResidentCreateDto } from 'src/resident/dto/resident.create.dto';

export interface TenantCreateDto extends ContractCreateDto, Bail {
  propertyId?: number;
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
  fullNameT2?: string;
  birthDateT2?: Date;
  rgT2?: string;
  cpfT2?: string;
  nationalityT2?: string;
  maritalStatusT2?: string;
  professionT2?: string;
  emailT2?: string;
  contact1T2?: string;
  contact2T2?: string;
  residents?: ResidentCreateDto[];
}
