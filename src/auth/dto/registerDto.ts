import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Roles } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
  @IsNotEmpty()
  @ApiProperty()
  password: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
  @IsOptional()
  role?: Roles;
}
