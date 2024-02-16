import { Repository } from 'typeorm';
import { User } from './user.entity';

// Creating and Using Custom Repositories in NestJS with TypeORM 0.3
// https://tech.durgadas.in/creating-and-using-custom-repositories-in-nestjs-with-typeorm-0-3-c7ac9548ad99
// this was actually really helpful, esp with registering in the module

export interface UsersRepository extends Repository<User> {
  this: Repository<User>;
}

export const customUsersRepository: Pick<UsersRepository, any> = {};
