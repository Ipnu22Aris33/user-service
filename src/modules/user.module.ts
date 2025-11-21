import { USER_IN_PORT, USER_OUT_PORT } from '@core/application/ports/user.port';
import { UserUseCase } from '@core/application/usecases/user.use-case';
import { DatabaseModule } from 'src/adapters/outbound/persistence/databases/database.module';
import { UserRepository } from 'src/adapters/outbound/persistence/databases/mongoose/repositories/user.repository';
import { Module } from '@nestjs/common';
import { UserController } from 'src/adapters/inbound/http/controllers/user.controller';
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
