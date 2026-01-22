import { IsInt, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

class CreateOrderDishDto {
  @IsInt()
  @Min(1)
  dishId: number;

  @IsInt()
  @Min(1)
  amount: number;
}

export class CreateOrderDto {
  @IsInt()
  @Min(1)
  table: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDishDto)
  orderDishes: CreateOrderDishDto[];
}
