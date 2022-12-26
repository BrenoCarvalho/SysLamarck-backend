export interface UserCreateDto {
  fullName: string;
  username: string;
  email: string;
  password: string;
  birthDate: Date;
  rg?: string;
  cpf?: string;
  nationality?: string;
  maritalStatus?: string;
  contact1: string;
  contact2?: string;
  cep?: string;
  address?: string;
  city?: string;
  district?: string;
  bank?: string;
  accountType?: string;
  agency?: string;
  accountNumber?: string;
}
