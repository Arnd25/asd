import { IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';

class OrderDish {
  @ApiProperty()
  dishId: number;
  @ApiProperty()
  amount: number;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  table?: number;
  @ApiProperty({
    enum: Status,
  })
  @IsEnum(Status)
  status: Status;
  @ApiProperty({
    type: [OrderDish],
  })
  OrderDishes: OrderDish[];
}
