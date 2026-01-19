import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './order/order.module';
import { DishModule } from './dish/dish.module';
import { OrderDishesModule } from './order-dishes/order-dishes.module';

@Module({
  imports: [PrismaModule, OrderModule, DishModule, OrderDishesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
