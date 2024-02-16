import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { customUsersRepository } from './users.repository';

@Module({
  providers: [
    AuthService,
    {
      provide: getRepositoryToken(User),
      inject: [getDataSourceToken()],
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(User).extend(customUsersRepository),
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
