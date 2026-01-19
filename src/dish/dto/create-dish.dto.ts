import { ApiProperty } from '@nestjs/swagger';

export class CreateDishDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  price: number;
}
