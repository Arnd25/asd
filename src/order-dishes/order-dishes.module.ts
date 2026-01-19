import { Module } from '@nestjs/common';
import { OrderDishesService } from './order-dishes.service';
import { OrderDishesController } from './order-dishes.controller';

@Module({
  controllers: [OrderDishesController],
  providers: [OrderDishesService],
})
export class OrderDishesModule {}
