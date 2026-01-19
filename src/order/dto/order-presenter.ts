import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';

export class OrderPresenter {
  @ApiProperty()
  table?: number;
  @ApiProperty({ type: () => [OrderDishPresenter] })
  OrderDishes: OrderDishPresenter[];
  price: number;
}

class OrderDishPresenter {
  orderId: number;
  dishId: number;
  amount: number;
  status: Status;
}
