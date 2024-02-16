import { DeleteResult, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

// Creating and Using Custom Repositories in NestJS with TypeORM 0.3
// https://tech.durgadas.in/creating-and-using-custom-repositories-in-nestjs-with-typeorm-0-3-c7ac9548ad99
// this was actually really helpful, esp with registering in the module

export interface TasksRepository extends Repository<Task> {
  this: Repository<Task>;
  getTaskById(id: string): Promise<Task>;
  createTask(createTaskDto: CreateTaskDto): Promise<Task>;
  deleteTask(id: string): Promise<DeleteResult>;
}

export const customTasksRepository: Pick<TasksRepository, any> = {
  getTaskById(this: Repository<Task>, id: string) {
    return this.findOne({ where: { id } });
  },

  createTask(this: Repository<Task>, createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    this.save(task);
    return task;
  },

  // delete is better choice than remove
  // fewer queries to the database
  // check for affected count in result
  deleteTask(this: Repository<Task>, id: string) {
    return this.delete(id);
  },
};
