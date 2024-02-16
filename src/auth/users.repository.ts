import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// Creating and Using Custom Repositories in NestJS with TypeORM 0.3
// https://tech.durgadas.in/creating-and-using-custom-repositories-in-nestjs-with-typeorm-0-3-c7ac9548ad99
// this was actually really helpful, esp with registering in the module

export interface UsersRepository extends Repository<User> {
  this: Repository<User>;
  getUserByUsername(username: string): Promise<User>;
  createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
}

export const customUsersRepository: Pick<UsersRepository, any> = {
  getUserByUsername(this: Repository<User>, username: string) {
    return this.findOne({ where: { username } });
  },

  async createUser(
    this: Repository<User>,
    authCredentialsDto: AuthCredentialsDto,
  ) {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });
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
