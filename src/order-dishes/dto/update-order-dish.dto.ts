import { PartialType } from '@nestjs/swagger';
import { CreateOrderDishDto } from './create-order-dish.dto';

export class UpdateOrderDishDto extends PartialType(CreateOrderDishDto) {


}
