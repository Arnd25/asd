import { Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DishService {
  constructor(private prisma: PrismaService) {}
  create(createDishDto: CreateDishDto) {
    return this.prisma.dish.create({ data: createDishDto });
  }

  findAll() {
    return this.prisma.dish.findMany();
  }

  findOne(id: number) {
    return this.prisma.dish.findUnique({ where: { id } });
  }

  update(id: number, updateDishDto: UpdateDishDto) {
    return this.prisma.dish.update({ where: { id }, data: updateDishDto });
  }

  remove(id: number) {
    return this.prisma.dish.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
