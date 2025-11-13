import { Module } from '@nestjs/common';
import { EnvConfig } from '@infrastructure/config/env.config';
import { DatabaseModule } from '@infrastructure/persistence/databases/database.module';
import { ProfileModule } from '@presentation/modules/profile.module';
import { UserModule } from '@presentation/modules/user.module';
import { TokenModule } from '@presentation/modules/token.module';
import { JwtModule } from '@presentation/modules/jwt.module';
import { BcryptPasswordHasherModule } from '@presentation/modules/bcrypt-password-hasher.module';

@Module({
  imports: [EnvConfig, DatabaseModule, JwtModule, BcryptPasswordHasherModule, TokenModule, ProfileModule, UserModule],
})
export class AppModule {}
