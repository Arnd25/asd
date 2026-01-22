import {
  IsInt,
  IsArray,
  ValidateNested,
  Min,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '../enum/order-satus.enum';

class UpdateOrderDishDto {
  @IsInt()
  @Min(1)
  dishId: number;

  @IsInt()
  @Min(1)
  amount: number;
}

export class UpdateOrderDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  table?: number;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateOrderDishDto)
  dishes?: UpdateOrderDishDto[];
}
