import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  controllers: [OrderController],
  providers: [OrderService, JwtStrategy],
})
export class OrderModule {}
