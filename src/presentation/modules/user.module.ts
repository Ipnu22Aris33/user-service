import { USER_IN_PORT, USER_OUT_PORT } from '@application/ports/user.port';
import { UserUseCase } from '@application/usecases/user.use-case';
import { DatabaseModule } from '@infrastructure/persistence/databases/database.module';
import { UserRepository } from '@infrastructure/persistence/databases/mongoose/repositories/user.repository';
import { Module } from '@nestjs/common';
import { UserController } from '@presentation/controllers/user.controller';
import { ProfileModule } from './profile.module';
import { TokenModule } from './token.module';
import { JwtModule } from './jwt.module';
import { BcryptPasswordHasherModule } from './bcrypt-password-hasher.module';

@Module({
  imports: [DatabaseModule, ProfileModule, TokenModule, JwtModule, BcryptPasswordHasherModule],
  controllers: [UserController],
  providers: [
    {
      provide: USER_OUT_PORT,
      useClass: UserRepository,
    },
    {
      provide: USER_IN_PORT,
      useClass: UserUseCase,
    },
  ],
  exports: [USER_OUT_PORT],
})
export class UserModule {}
