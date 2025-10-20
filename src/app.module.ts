import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infrastructure/persistence/databases/database.module';
import { EnvConfig } from '@infrastructure/config/env.config';
import { ProfileModule } from '@presentation/module/profile.module';

@Module({
  imports: [EnvConfig, DatabaseModule, ProfileModule],
})
export class AppModule {}
