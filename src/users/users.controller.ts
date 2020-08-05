import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { NewUserDto } from './User.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post('register')
  @Post()
  async createNewUser(
    @Body() body: NewUserDto,
  ): Promise<{ id: number; firstName: string; lastName: string; email: string }> {
    const { firstName, lastName, email, password } = body;
    const user = await this.usersService.create({ firstName, lastName, email, password });
    return { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    const { password, ...rest } = user.dataValues;
    return rest;
  }
}
