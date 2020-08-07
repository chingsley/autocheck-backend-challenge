import { CarsService } from './cars.service';
import { Car, NewCarDto, carUpdateDto } from './car.model';
import { Controller, Post, Body, Patch, Param, ParseIntPipe, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  async addNewCar(@Body() body: NewCarDto): Promise<any> {
    const car = await this.carsService.create(body);
    return car;
  }

  @Patch(':id')
  async editCar(@Body() body: carUpdateDto, @Param('id', ParseIntPipe) id: number): Promise<Car> {
    return await this.carsService.update(id, body);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getAlCars(): Promise<Car[]> {
    return await this.carsService.findAll();
  }
}
