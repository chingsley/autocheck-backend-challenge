import { Controller, Post, Body, Get, Param, Patch, Delete, HttpCode } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { Wallet } from './wallet.model';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  // @Post('register')
  @Post()
  async createNewUser(
    @Body() body: Wallet,
    @Body('debitCardNumber') dbtCardNumber: string,
    @Body('creditCardNumber') crdtCardNumber: string,
    @Body('balance') balance: number,
    @Body('uerId') userId: number,
  ): Promise<Wallet> {
    console.log(body);
    const wallet = await this.walletsService.create(crdtCardNumber, dbtCardNumber, balance, userId);
    return wallet;
  }

  // @Get()
  // async getAllUsers(@Req)
}
