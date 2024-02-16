import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// @EntityRepository(Task)
// export class TasksRepository extends Repository<Task> {
//   // ... methods will go here
// }
// ^ deprecated, but this works :D
// https://stackoverflow.com/a/73239250

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(
    @InjectRepository(Task)
    repository: Repository<Task>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
