import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { Car } from './cars/car.model';
import { User } from './users/user.model';
import { UsersModule } from './users/users.module';
import { WalletsModule } from './wallets/wallets.module';
import { Wallet } from './wallets/wallet.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root1234',
      database: 'autocheck',
      models: [User, Car, Wallet],

      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    CarsModule,
    WalletsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
