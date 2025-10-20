import { PROFILE_IN_PORT } from '@application/ports/in/profile.in-port';
import { PROFILE_OUT_PORT } from '@application/ports/out/profile.out-port';
import { ProfileService } from '@application/services/profile.service';
import { ProfileUseCase } from '@application/usecases/profile.use-case';
import { DatabaseModule } from '@infrastructure/persistence/databases/database.module';
import { ProfileRepository } from '@infrastructure/persistence/databases/mongoose/repositories/profile.repository';
import { Module, Provider } from '@nestjs/common';
import { ProfileController } from '@presentation/controllers/profile.controller';

const profilePortProviders: Provider[] = [
  { provide: PROFILE_IN_PORT, useClass: ProfileUseCase },
  { provide: PROFILE_OUT_PORT, useClass: ProfileRepository },
];

@Module({
  imports: [DatabaseModule],
  controllers: [ProfileController],
  providers: [...profilePortProviders, ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
