import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

@Injectable()
export class DishesService {
  constructor(private prisma: PrismaService) {}

  create(createDishDto: CreateDishDto) {
    return this.prisma.dishes.create({ data: createDishDto });
  }

  findAll() {
    return this.prisma.dishes.findMany({ where: { deletedAt: null } });
  }

  async findOne(id: number) {
    const dish = await this.prisma.dishes.findUnique({
      where: { id, deletedAt: null },
    });

    if (!dish) {
      throw new NotFoundException(`Dish with this id is not found`);
    }

    return dish;
  }

  async update(id: number, updateDishDto: UpdateDishDto) {
    await this.findOne(id);
    return this.prisma.dishes.update({ where: { id }, data: updateDishDto });
  }

  remove(id: number) {
    return this.prisma.dishes.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
