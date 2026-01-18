import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  create(createOrderDto: CreateOrderDto) {
    return this.prisma.order.create({ data: createOrderDto });
  }

  findAll() {
    return this.prisma.order.findMany({ where: { deletedAt: null } });
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id, deletedAt: null },
    });
    if (!order) {
      throw new NotFoundException(`Order with this id is not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.findOne(id);
    return this.prisma.order.update({ where: { id }, data: updateOrderDto });
  }

  remove(id: number) {
    return this.prisma.order.update({
      where: { id },
      data: { deletedAt: new Date(), table: null },
    });
  }
}
