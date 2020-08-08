import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    this.logger.debug('Called every 5 seconds');
  }

  @Cron('*/5 * * * * *', {
    name: 'notifications',
  })
  async sendCronMail() {
    const job = this.schedulerRegistry.getCronJob('notifications');

    job.stop();
    console.log(job.lastDate());
  }
}
