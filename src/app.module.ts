import { Module } from '@nestjs/common';

import { DishesModule } from './dishes/dishes.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [DishesModule, PrismaModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
