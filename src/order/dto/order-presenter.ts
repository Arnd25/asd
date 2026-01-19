import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';

export class OrderPresenter extends PartialType(CreateOrderDto) {
  @ApiProperty()
  id: number;
  @ApiProperty({ example: 'asds' })
  title: string;
  @ApiProperty({})
  status: Status;
  @ApiProperty()
  table?: number;
  @ApiProperty()
  amount: number;
  orderDished: {

  }
}
