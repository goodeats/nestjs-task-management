import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

// Creating and Using Custom Repositories in NestJS with TypeORM 0.3
// https://tech.durgadas.in/creating-and-using-custom-repositories-in-nestjs-with-typeorm-0-3-c7ac9548ad99
// this was actually really helpful, esp with registering in the module

export interface UsersRepository extends Repository<User> {
  this: Repository<User>;
  createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
}

export const customUsersRepository: Pick<UsersRepository, any> = {
  async createUser(
    this: Repository<User>,
    authCredentialsDto: AuthCredentialsDto,
  ) {
    const { username, password } = authCredentialsDto;
    const user = this.create({ username, password });
    try {
      await this.save(user);
    } catch (error) {
      const duplicateUsername = error.code === '23505';
      if (duplicateUsername) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  },
};
