import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import {
  TypeOrmModule,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { customUsersRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret123',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: getRepositoryToken(User),
      inject: [getDataSourceToken()],
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(User).extend(customUsersRepository),
    },
  ],
})
export class AuthModule {}
