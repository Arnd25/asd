import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';

import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [DishController],
  providers: [DishService],
  imports: [PassportModule],
})
export class DishModule {}
