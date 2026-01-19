import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DishStatus, Status } from '@prisma/client';

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
    return data;
  }

  findAll() {
    return this.prisma.order.findMany({ where: { deletedAt: null } });
  }

  findOne(id: number) {
    const order = this.prisma.order.findUnique({
      where: { id },
    });
    return order;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: {
        table: updateOrderDto.table,
        OrderDishes: {
          create: updateOrderDto.OrderDishes?.map((dish) => ({
            dishId: dish.dishId,
            status: DishStatus.Pending,
            amount: dish.amount,
          })),
        },
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
