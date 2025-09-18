import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { UserController } from '@presentation/controllers/user.controller';
import {
  User,
  UserSchema,
} from '@infrastructure/databases/mongoose/schemas/user.schema';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { CreateUserUseCase } from '@application/usecases/create-user.usecase';
// import { UserService } from '@application/services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  // controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    CreateUserUseCase,
    // UserService,
  ],
  exports: [CreateUserUseCase],
})
export class UserModule {}
