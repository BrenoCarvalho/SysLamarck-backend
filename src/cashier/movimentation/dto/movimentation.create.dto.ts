export interface MovimentationCreateDto {
  description: string;
  date: Date;
  credit?: number;
  debit?: number;
}
