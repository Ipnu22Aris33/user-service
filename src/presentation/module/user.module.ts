import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '@presentation/controllers/user.controller';
import {
  User,
  UserSchema,
} from '@infrastructure/databases/schemas/user.schema';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { CreateUserUseCase } from '@application/usecases/create-user.usecase';
import { UserService } from '@application/services/user.service';
import { FindUserByUidUseCase } from '@application/usecases/find-by-uid.usecase';
import { UpdateUserStatusUseCase } from '@application/usecases/update-user-status.use-case';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
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
