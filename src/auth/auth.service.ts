import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/registerDto';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './authEntity';
import { LoginDto } from './dto/loginDto';
import { User } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private JwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthEntity> {
    const { name, email, password, role } = registerDto;

    const existinguser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existinguser) {
      throw new UnauthorizedException('Email already exist');
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
      },
    });
    return {
      accessToken: this.JwtService.sign({ userId: user.userId }),
      refreshToken: this.createRefreshToken(user),
    };
  }
  async login(Dto: LoginDto): Promise<AuthEntity> {
    const { email, password } = Dto;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('Passwords do not match');
    }
    const payload = { sub: user.userId, username: user.name };

    return {
      accessToken: this.JwtService.sign(payload),
      refreshToken: this.createRefreshToken(user),
    };
  }
  createRefreshToken(user: User): string {
    const refreshToken = this.JwtService.sign({}, { expiresIn: '7d' });
    user.refreshToken = refreshToken;

    return refreshToken;
  }
  async refreshAccessToken(refreshToken: string) {
    try {
      this.JwtService.verify(refreshToken);
      const user = await this.prisma.user.findUnique({
        where: { refreshToken },
      });

      if (!user) {
        throw new UnauthorizedException('invalid refresh token');
      }
      const payload = { email: user.email, userId: user.userId };
      return {
        access_token: this.JwtService.sign(payload),
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
