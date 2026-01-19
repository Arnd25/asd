import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderDishesService } from './order-dishes.service';
import { CreateOrderDishDto } from './dto/create-order-dish.dto';
import { UpdateOrderDishDto } from './dto/update-order-dish.dto';

@Controller('order-dishes')
export class OrderDishesController {
  constructor(private readonly orderDishesService: OrderDishesService) {}

  @Post()
  create(@Body() createOrderDishDto: CreateOrderDishDto) {
    return this.orderDishesService.create(createOrderDishDto);
  }

  @Get()
  findAll() {
    return this.orderDishesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderDishesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDishDto: UpdateOrderDishDto,
  ) {
    return this.orderDishesService.update(+id, updateOrderDishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderDishesService.remove(+id);
  }
}
