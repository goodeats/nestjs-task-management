import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

// scaffolded by nestjs: `nest g module tasks`

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
