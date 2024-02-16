import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: UsersRepository,
  ) {}

  // service is business logic: sign up
  // repository is data access: create user
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.usersRepository.createUser(authCredentialsDto);
  }
}
