import { Module } from '@nestjs/common';
import { UserController } from '@presentation/controllers/user.controller';
import { UserRepository } from '@infrastructure/persistence/databases/mongoose/repositories/user.repository';
import { CreateUserUseCase } from '@application/usecases/user/create-user.usecase';
import { UserService } from '@application/services/user.service';
import { FindUserByUidUseCase } from '@application/usecases/user/find-by-uid.usecase';
import { UpdateUserStatusUseCase } from '@application/usecases/user/update-user-status.use-case';
import { DatabaseModule } from '@infrastructure/persistence/databases/database.module';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '@infrastructure/security/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, HttpModule, AuthModule, JwtModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserPort',
      useClass: UserRepository,
    },
    CreateUserUseCase,
    UpdateUserStatusUseCase,
    FindUserByUidUseCase,
    UserService,
  ],
  exports: [CreateUserUseCase],
})
export class UserModule {}
