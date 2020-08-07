import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { CarsService } from '../cars/cars.service';
import { SalesService } from './sales.services';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NewSaleDto } from './sale.model';

@Controller('sales')
export class SalesController {
  constructor(
    private readonly salesService: SalesService,
    private readonly carsService: CarsService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async savePurchase(@Request() req, @Body() body: NewSaleDto) {
    const { carId } = body;
    const { userId } = req.user;
    const car = await this.carsService.findOne(carId);
    const user = await this.usersService.findOne(userId);
    return this.salesService.performPaymentTransaction(car, user);
  }
}
