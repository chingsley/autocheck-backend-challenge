import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService, private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get()
  getHello(): { serverStatus: string } {
    const serverStatus = this.appService.getServerStatus();
    return { serverStatus };
  }
}
