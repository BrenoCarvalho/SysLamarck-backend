export interface DataTemplateSaveDto {
  tenantId: number;
  type: 'credit' | 'debit';
  data?: object;
}
