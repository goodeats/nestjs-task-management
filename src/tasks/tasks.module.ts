import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';

// scaffolded by nestjs: `nest g module tasks`

@Module({
  controllers: [TasksController],
})
export class TasksModule {}
