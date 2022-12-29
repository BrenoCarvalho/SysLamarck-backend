export interface PropertyCreateDto {
  locatorCode: number;
  locatorName?: string;
  propertyType: string;
  cep: string;
  city: string;
  district: string;
  address: string;
  propertyDescription: string;
  IPTUPayer: string;
  DIMOBDeclaration: boolean;
  goalOfProperty: string;
  leaseFee: string;
  administrationTax: string;
  integralValue: string;
  leaseAmount: string;
  sellValue: string;
  vacant: boolean;
  registrationValue: string;
  cityCode: string;
  IPTUNumber: string;
  IntegralIPTUValue: string;
  numberInstallments: string;
  installmentsIPTUValue: string;
  edpInstallation: string;
  rgi: string;
  supply: string;
}
