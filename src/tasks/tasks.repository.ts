import { DataSource } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository } from 'src/shared/entity.repository';

@Injectable()
export class TasksRepository extends EntityRepository<Task> {
  constructor(
    @InjectRepository(Task)
    dataSource: DataSource,
  ) {
    super(Task, dataSource);
  }
}
