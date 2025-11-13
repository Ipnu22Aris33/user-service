import { PROFILE_IN_PORT, PROFILE_OUT_PORT } from '@application/ports/profile.port';
import { ProfileUseCase } from '@application/usecases/profile.use-case';
import { DatabaseModule } from '@infrastructure/persistence/databases/database.module';
import { ProfileRepository } from '@infrastructure/persistence/databases/mongoose/repositories/profile.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    {
      provide: PROFILE_OUT_PORT,
      useClass: ProfileRepository,
    },
    {
      provide: PROFILE_IN_PORT,
      useClass: ProfileUseCase,
    },
  ],
  exports: [PROFILE_OUT_PORT],
})
export class ProfileModule {}
