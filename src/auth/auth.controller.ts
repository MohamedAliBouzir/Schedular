import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('sign-up')
  signup(@Body() dto: AuthDto) {
    console.log({ dto });
    return this.authService.signUp();
  }
  @Post('sign-in')
  login() {
    return this.authService.login();
  }
}
