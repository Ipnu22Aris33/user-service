import { ProfileEntity } from '@domain/entities/profile.entity';

export const PROFILE_OUT_PORT = Symbol('PROFILE_OUT_PORT');

export interface ProfileOutPort {
  save(profile: ProfileEntity): Promise<void>;
  findByUid(uid: string): Promise<ProfileEntity | null>;
  findByUserUid(uid: string): Promise<ProfileEntity | null>;
}
