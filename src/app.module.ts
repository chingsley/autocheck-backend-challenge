import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleModule } from '@nestjs/schedule';

import { SendGridModule } from '@ntegral/nestjs-sendgrid';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { Car } from './cars/car.model';
import { User } from './users/user.model';
import { UsersModule } from './users/users.module';
import { WalletsModule } from './wallets/wallets.module';
import { Wallet } from './wallets/wallet.model';
import { Sale } from './sales/sale.model';
import { AuthModule } from './auth/auth.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root1234',
      database: 'autocheck',
      models: [User, Car, Wallet, Sale],

      autoLoadModels: true,
      synchronize: true,
    }),
    SendGridModule.forRoot({
      apiKey: process.env.SENDGRID_API_KEY,
    }),
    UsersModule,
    CarsModule,
    WalletsModule,
    SalesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
