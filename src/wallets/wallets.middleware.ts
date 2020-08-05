// import { Request, Response } from 'express';

// export function validateCardNumber(req: Request, res: Response, next: Function) {
//   console.log(req.body, '\n\n', res);
//   return res.status(400).json({ error: 'testing mode' });
//   // next();
// }

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { NewWalletDto } from './wallet.model';

@Injectable()
export class validateCardNumber implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    // console.log(req.body);
    // const body: NewWalletDto = req.body;
    const { cardNumber } = req.body;

    cardNumber && this.validateCard(cardNumber);
    next();
  }

  /**
   * The function uses Luhn's algorithm to validate card number
   * @param str
   */
  private validateCard(str: string) {
    const arr = str.split('').reverse();
    const doubleEveryOther = arr.map((ele, index) => {
      let val = Number(ele);
      if (index % 2 === 1) {
        val = Number(ele) * 2;
        if (val > 9) val = Math.floor(val / 10) + (val % 10);
      }
      return val;
    });
    const total = doubleEveryOther.reduce((result, item) => result + item);
    if (total % 10 !== 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'invalid card; please enter a valid card',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return total % 10 === 0;
  }
}
