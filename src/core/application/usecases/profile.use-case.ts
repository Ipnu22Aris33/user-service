import { PROFILE_OUT_PORT, ProfileInPort, type ProfileOutPort } from '@core/application/ports/profile.port';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProfileUseCase implements ProfileInPort {
  constructor(@Inject(PROFILE_OUT_PORT) private readonly profileOutPort: ProfileOutPort) {}
}
