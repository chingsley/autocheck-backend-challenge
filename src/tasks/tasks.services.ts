import { Injectable } from '@nestjs/common';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { Car } from '../cars/car.model';
import { User } from '../users/user.model';

@Injectable()
export class TasksService {
  constructor(@InjectSendGrid() private readonly client: SendGridService) {}

  sendNotification(car: Car, user: User): void {
    const text = `Hi ${user.firstName}\nThis is a comfirmation that your purchase of ${car.make} ${car.model} (vin: ${car.vin}) was successful.\nYour car is ready for pickup.\nCongratulations!`;
    console.log(text);
    const msg = {
      to: user.email,
      from: process.env.MAIL_SENDER,
      subject: process.env.MAIL_SUBJECT,
      text: text,
      html: text,
    };
    // send mail after 5 minutes
    setTimeout(async () => {
      await this.client.send(msg);
    }, 5 * 60 * 1000);
  }
}
