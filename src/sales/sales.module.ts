import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Sale } from './sale.model';
import { SalesService } from './sales.services';
import { SalesController } from './sales.controller';
import { CarsModule } from '../cars/cars.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Sale]), CarsModule, UsersModule],
  exports: [SequelizeModule, SalesService],
  providers: [SalesService],
  controllers: [SalesController],
})
export class SalesModule {}
