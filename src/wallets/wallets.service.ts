import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wallet } from './wallet.model';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet)
    private walletModel: typeof Wallet,
  ) {}

  async create(cardNumber: string, balance: number, userId: number): Promise<Wallet> {
    await this.rejectDuplicateCard(cardNumber);
    const wallet = new this.walletModel({ cardNumber, balance, userId });
    await wallet.save();
    return wallet;
  }

  async topUp(userId: number, amount: number): Promise<Wallet> {
    const userWallet = await this.findOne(userId);
    return userWallet;
    userWallet.balance = Number(userWallet.balance) + Number(amount);
    await userWallet.save();
    return userWallet;
  }

  async findAll(): Promise<Wallet[]> {
    return this.walletModel.findAll();
  }

  async findOne(id: number): Promise<Wallet> {
    const wallet = await this.walletModel.findOne({
      where: {
        id,
      },
    });
    if (!wallet) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'no wallet found for the user',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return wallet;
  }

  async remove(id: number): Promise<void> {
    const wallet = await this.findOne(id);
    await wallet.destroy();
  }

  private async rejectDuplicateCard(cardNumber: string) {
    const wallet = await this.walletModel.findOne({ where: { cardNumber } });
    if (wallet) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'card already in use',
        },
        HttpStatus.CONFLICT,
      );
    }
  }
}
