export interface LocatorCreateDto {
  provisionService: string;
  fullName: string;
  birthDate: Date;
  rg: number;
  cpf: number;
  nationality: string;
  maritalStatus: string;
  profession: string;
  email?: string;
  contact1: number;
  contact2?: number;
  cep: number;
  address: string;
  city: string;
  district: string;
  bank: string;
  accountType: string;
  agency: number;
  accountNumber: number;
  paymentRemittance: string;
}
