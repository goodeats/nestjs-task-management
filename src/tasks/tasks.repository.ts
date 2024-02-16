import { DeleteResult, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter';
import { User } from 'src/auth/user.entity';

// Creating and Using Custom Repositories in NestJS with TypeORM 0.3
// https://tech.durgadas.in/creating-and-using-custom-repositories-in-nestjs-with-typeorm-0-3-c7ac9548ad99
// this was actually really helpful, esp with registering in the module

export interface TasksRepository extends Repository<Task> {
  this: Repository<Task>;
  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
  getTaskById(id: string, user: User): Promise<Task>;
  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
  updateTaskStatus(task: Task): Promise<Task>;
  deleteTask(id: string, user: User): Promise<DeleteResult>;
}

export const customTasksRepository: Pick<TasksRepository, any> = {
  getTasks(this: Repository<Task>, filterDto: GetTasksFilterDto, user: User) {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task'); // very cool
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status }); // to be able to do this
    }

    if (search) {
      // wrap in parens to avoid precedence issues
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      ); // and this
    }

    return query.getMany(); // sql is easy
  },

  getTaskById(this: Repository<Task>, id: string, user: User) {
    return this.findOne({ where: { id, user } });
  },

  async createTask(
    this: Repository<Task>,
    createTaskDto: CreateTaskDto,
    user: User,
  ) {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    return await this.save(task);
  },

  async updateTaskStatus(this: Repository<Task>, task: Task) {
    return await this.save(task);
  },

  // delete is better choice than remove
  // fewer queries to the database
  // check for affected count in result
  async deleteTask(this: Repository<Task>, id: string, user: User) {
    return await this.delete({ id, user });
  },
};
