import {
  PROFILE_OUT_PORT,
  type ProfileOutPort,
} from '@application/ports/out/profile.out-port';
import { ProfileEntity } from '@domain/entities/profile.entity';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(PROFILE_OUT_PORT)
    private readonly port: ProfileOutPort,
  ) {}

  async save(profile: ProfileEntity): Promise<void> {
    await this.port.save(profile);
  }

  async findByUid(uid: string): Promise<ProfileEntity | null> {
    return await this.port.findByUid(uid);
  }

  async findByUserUid(uid: string): Promise<ProfileEntity | null> {
    return await this.port.findByUserUid(uid);
  }
}
