import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Wallet } from './wallet.model';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { validateCardNumber } from './wallets.middleware';

@Module({
  imports: [SequelizeModule.forFeature([Wallet])],
  exports: [SequelizeModule, WalletsService],
  providers: [WalletsService],
  controllers: [WalletsController],
})
// export class WalletsModule {}
export class WalletsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(validateCardNumber).forRoutes({ path: 'wallets', method: RequestMethod.POST });
  }
}
