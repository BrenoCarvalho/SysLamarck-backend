export interface LocatorCreateDto {
  provisionService: string;
  fullName: string;
  birthDate: Date;
  rg: string;
  cpf: string;
  nationality: string;
  maritalStatus: string;
  profession: string;
  email?: string;
  contact1: string;
  contact2?: string;
  cep: string;
  address: string;
  city: string;
  district: string;
  bank: string;
  accountType: string;
  agency: string;
  accountNumber: string;
  paymentRemittance: string;
}
