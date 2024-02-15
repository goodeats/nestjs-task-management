import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';

// scaffolded by nestjs: `nest g controller tasks --no-spec`

@Controller('tasks')
export class TasksController {
  // new
  constructor(private tasksService: TasksService) {}
  // old
  // tasksService: TasksService;

  // constructor(tasksService: TasksService) {
  //   this.tasksService = tasksService;
  // }

  helloWorld() {
    // return this.tasksService.helloWorld();
  }
}
