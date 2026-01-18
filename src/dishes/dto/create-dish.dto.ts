import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateDishDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;
}
