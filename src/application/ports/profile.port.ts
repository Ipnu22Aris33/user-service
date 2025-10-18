import { ProfileEntity } from '@domain/entities/profile.entity';

export const PROFILE_PORT = Symbol('PROFILE_PORT')

export interface ProfilePort {
  save(profile: ProfileEntity): Promise<void>;
  findByUid(uid: string): Promise<ProfileEntity | null>;
}
