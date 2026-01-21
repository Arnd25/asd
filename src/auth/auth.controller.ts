import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerDto';
import { LoginDto } from './dto/loginDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @Post('login')
  async login(@Body() signInDto: LoginDto) {
    return this.authService.login(signInDto);
  }
  @Post('refreshToken')
  async RefreshToken(@Body() refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }
}
