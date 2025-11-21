import { Module } from '@nestjs/common';
import { EnvConfig } from '@infrastructure/config/env.config';
import { DatabaseModule } from 'src/adapters/outbound/persistence/databases/database.module';
import { ProfileModule } from './modules/profile.module';
import { UserModule } from './modules/user.module';
import { TokenModule } from './modules/token.module';
import { JwtModule } from './modules/jwt.module';
import { BcryptPasswordHasherModule } from './modules/bcrypt-password-hasher.module';

@Module({
  imports: [EnvConfig, DatabaseModule, JwtModule, BcryptPasswordHasherModule, TokenModule, ProfileModule, UserModule],
})
export class AppModule {}
