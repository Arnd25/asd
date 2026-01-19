import { DishStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDishDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  orderId: number;
  @ApiProperty()
  dishId: number;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  status: DishStatus;
  @ApiProperty()
  readyAt: Date;
}
