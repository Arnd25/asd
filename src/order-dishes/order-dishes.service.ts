import { Injectable } from '@nestjs/common';
import { CreateOrderDishDto } from './dto/create-order-dish.dto';
import { UpdateOrderDishDto } from './dto/update-order-dish.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderDishesService {
  constructor(private prisma: PrismaService) {}
  create(createOrderDishDto: CreateOrderDishDto) {
    return this.prisma.orderDishes.create({ data: createOrderDishDto });
  }

  findAll() {
    return this.prisma.orderDishes.findMany();
  }

  findOne(id: number) {
    return this.prisma.orderDishes.findUnique({ where: { id } });
  }

  update(id: number, updateOrderDishDto: UpdateOrderDishDto) {
    return this.prisma.orderDishes.update({
      where: { id },
      data: updateOrderDishDto,
    });
  }

  remove(id: number) {
    return this.prisma.orderDishes.update({
      where: { id },
      data: { canceledAt: new Date() },
    });
  }
}
