import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './order/order.module';
import { DishModule } from './dish/dish.module';
import { OrderDishesModule } from './order-dishes/order-dishes.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, OrderModule, DishModule, OrderDishesModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
