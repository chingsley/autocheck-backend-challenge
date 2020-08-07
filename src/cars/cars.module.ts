import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Car } from './car.model';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';

@Module({
  imports: [SequelizeModule.forFeature([Car])],
  exports: [SequelizeModule, CarsService],
  providers: [CarsService],
  controllers: [CarsController],
})
export class CarsModule {}
