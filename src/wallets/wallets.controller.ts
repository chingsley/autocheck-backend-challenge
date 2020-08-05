import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { Wallet, NewWalletDto } from './wallet.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createNewUserWallet(@Request() req, @Body() body: NewWalletDto): Promise<Wallet> {
    console.log('\n req.user = ', req.user);
    const { cardNumber, balance } = body;
    // req.user is set during authorization by passport-jwt
    const { userId } = req.user;
    const wallet = await this.walletsService.create(cardNumber, balance, userId);
    return wallet;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('top-up')
  async topUpUserWallet(@Request() req) {
    const { userId } = req.user;
    const { amount } = req.body;
    const wallet = await this.walletsService.topUp(userId, amount);
    return { message: 'top-up was successful', wallet };
  }
}
