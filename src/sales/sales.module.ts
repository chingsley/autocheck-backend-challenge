import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Sale } from './sale.model';
import { SalesService } from './sales.services';
import { SalesController } from './sales.controller';
import { CarsModule } from '../cars/cars.module';
import { UsersModule } from '../users/users.module';
import { TasksModule } from '../tasks/tasks.module';

// import { TasksService } from '../tasks/tasks.services';

@Module({
  imports: [SequelizeModule.forFeature([Sale]), CarsModule, UsersModule, TasksModule],
  exports: [SequelizeModule, SalesService],
  providers: [SalesService],
  controllers: [SalesController],
})
export class SalesModule {}
