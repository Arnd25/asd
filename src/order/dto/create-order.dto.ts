import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  status: string;
  @IsOptional()
  @IsNumber()
  table: number;
  @IsNumber()
  @Min(1)
  amount: number;
}
