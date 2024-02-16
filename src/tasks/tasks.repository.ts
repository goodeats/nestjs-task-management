import { DataSource } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from 'src/shared/entity.repository';

@Injectable()
export class TasksRepository extends GenericRepository<Task> {
  constructor(
    @InjectRepository(Task)
    dataSource: DataSource,
  ) {
    super(Task, dataSource);
  }
}
