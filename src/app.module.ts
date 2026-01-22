import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PrismaModule } from './modules/prisma/prisma.module';
import { envConfig } from './common/config/env.config';
import { AuthModule } from './modules/auth/auth.module';
import { DishModule } from './modules/dish/dish.module';
import { OrderModule } from './modules/order/order.module';
import * as path from 'path';
import * as process from 'node:process';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envConfig.validationSchema,
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule, AuthModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uploadDir = configService.get<string>('UPLOAD_DIR') || 'uploads';
        const absolutePath = path.join(process.cwd(), uploadDir);

        return [
          {
            rootPath: absolutePath,
            serveRoot: '/uploads',
            serveStaticOptions: { index: false },
          },
        ];
      },
    }),
    PrismaModule,
    AuthModule,
    DishModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
