import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wallet } from './wallet.model';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet)
    private walletModel: typeof Wallet,
  ) {}

  async create(
    creditCardNumber: string,
    debitCardNumber: string,
    balance: number,
    userId: number,
  ): Promise<Wallet> {
    const wallet = new this.walletModel({ creditCardNumber, debitCardNumber, balance, userId });
    await wallet.save();
    return wallet;
  }

  async findAll(): Promise<Wallet[]> {
    return this.walletModel.findAll();
  }

  findOne(id: string): Promise<Wallet> {
    return this.walletModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const wallet = await this.findOne(id);
    await wallet.destroy();
  }
}
