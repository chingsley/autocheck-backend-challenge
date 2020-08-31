import { Module } from '@nestjs/common';

import { TasksService } from './tasks.services';
import { SchedulerService } from './scheduler.services';

@Module({
  imports: [],
  exports: [TasksService],
  providers: [TasksService],
  controllers: [],
})
export class TasksModule {}
