import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDishDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
