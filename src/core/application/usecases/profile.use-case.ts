import { PROFILE_OUT_PORT, ProfileInPort, type ProfileOutPort } from '@application/ports/profile.port';
import { ProfileEntity } from '@domain/entities/profile.entity';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProfileUseCase implements ProfileInPort {
  constructor(@Inject(PROFILE_OUT_PORT) private readonly profileOutPort: ProfileOutPort) {}
}
