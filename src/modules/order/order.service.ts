import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createOrderDto: CreateOrderDto) {
    const data = await this.prisma.order.create({
      include: {
        orderDishes: true,
      },
      data: {
        table: createOrderDto.table,
        orderDishes: {
          createMany: {
            data: createOrderDto.orderDishes.map((dish) => ({
              dishId: dish.dishId,
              amount: dish.amount,
            })),
          },
        },
      },
    });
    return {
      table: data.table,
      orderDishes: data.orderDishes.map((dish) => ({
        dishId: dish.dishId,
        orderId: dish.orderId,
        amount: dish.amount,
      })),
    };
  }

  findAll() {
    return this.prisma.order.findMany({
      include: { orderDishes: true },
      where: {
        deletedAt: null,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.order.findUnique({
      include: { orderDishes: true },
      where: { id },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    if (updateOrderDto.dishes) {
      await this.prisma.orderDish.deleteMany({
        where: { id },
      });
      await this.prisma.orderDish.createMany({
        data: updateOrderDto.dishes.map((item) => ({
          orderId: id,
          dishId: item.dishId,
          amount: item.amount,
        })),
      });
    }
    return this.prisma.order.update({
      where: { id },
      data: {
        table: updateOrderDto.table,
        status: updateOrderDto.status,
      },
    });
  }

  remove(id: number) {
    return this.prisma.order.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
