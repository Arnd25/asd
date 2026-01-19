import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Status } from '@prisma/client';

@Injectable()
class OrderService {
  constructor(private prisma: PrismaService) {}
  async create(createOrderDto: CreateOrderDto) {
    const data = await this.prisma.order.create({
      include: {
        OrderDishes: true,
      },
      data: {
        table: createOrderDto.table,
        OrderDishes: {
          createMany: {
            data: createOrderDto.OrderDishes.map((dish) => ({
              dishId: dish.dishId,
              amount: dish.amount,
              status: Status.Pending,
            })),
          },
        },
      },
    });
    return {
      table: data.table,
      OrderDishes: data.OrderDishes.map((dish) => ({
        dishId: dish.dishId,
        orderId: dish.orderId,
        amount: dish.amount,
      })),
    };
  }

  async findAll() {
    const data = await this.prisma.order.findMany({
      where: { deletedAt: null },
      include: { OrderDishes: true },
    });
    return data.map((order) => ({
      table: order.table,
      OrderDishes: order.OrderDishes.map((dish) => ({
        orderId: dish.orderId,
        dishId: dish.dishId,
        amount: dish.amount,
      })),
    }));
  }

  async findOne(id: number) {
    const data = await this.prisma.order.findUnique({
      where: { id, deletedAt: null },
      include: { OrderDishes: true },
    });
    if (!data) throw new NotFoundException('Order not found');
    return {
      table: data.table || null,
      OrderDishes: data.OrderDishes.map((dish) => ({
        dishId: dish.dishId,
        orderId: dish.orderId,
        amount: dish.amount,
      })),
    };
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      include: { OrderDishes: true },
      data: {
        table: updateOrderDto.table,
      },
    });
  }

  remove(id: number) {
    return this.prisma.order.update({
      where: { id },
      data: { deletedAt: new Date(), table: null },
    });
  }
}

export default OrderService;
