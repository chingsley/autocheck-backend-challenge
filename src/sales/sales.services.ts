import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sale } from './sale.model';
import { User } from '../users/user.model';
import { Car } from '../cars/car.model';
import { Wallet } from '../wallets/wallet.model';
import { TasksService } from '../tasks/tasks.services';

@Injectable()
export class SalesService {
  constructor(@InjectModel(Sale) private saleModel: typeof Sale, private ts: TasksService) {}

  /**
   * *
   * step 1: if user.wallet.balance >= car.price
   * step 2: debit user (subtract the car price from the user balance)
   * step 3: [credit the companies account with the price of the car]
   * step 4: save the sales in th Sales table (carId, userId)
   * step 6: send notification to the user
   *
   * @param car car model instance of the car to be sold
   * @param user a user model instance of the purchasing using
   */
  async performPaymentTransaction(car: Car, user: User) {
    this.validatePayment(car, user);
    await this.debitUser(user.wallet, car);
    // [credit company's account here before the next line]
    const sale = new this.saleModel({ carId: car.id, userId: user.id });
    await sale.save();
    this.ts.sendNotification(car, user);
    return sale;
  }

  private validatePayment(car: Car, user: User): void {
    if (car.sold) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'the requested car has been sold',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    if (!user.wallet) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'user has no mobile wallet on this system. Please create a mobile wallet first',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    if (Number(user.wallet.balance) < Number(car.price)) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'transaction declined; insufficient fund',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private async debitUser(userWallet: Wallet, car: Car): Promise<void> {
    userWallet.balance = userWallet.balance - car.price;
    await userWallet.save();
  }
}
