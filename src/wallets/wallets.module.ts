import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Wallet } from './wallet.model';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';

@Module({
  imports: [SequelizeModule.forFeature([Wallet])],
  exports: [SequelizeModule],
  controllers: [WalletsController],
  providers: [WalletsService],
})
export class WalletsModule {}
