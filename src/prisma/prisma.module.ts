import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // ← делает модуль глобальным: его провайдеры доступны везде
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
