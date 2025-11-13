import { ProfileProps } from '@domain/entities/profile.entity';
import { ProfileEntity } from '@domain/entities/profile.entity';

export const PROFILE_IN_PORT = Symbol('PROFILE_IN_PORT');
export const PROFILE_OUT_PORT = Symbol('PROFILE_OUT_PORT'); 

export interface ProfileInPort {
  // createProfile(props: ProfileProps & { actor?: string }): Promise<ProfileEntity>;
  // updateProfile(props: ProfileProps & { actor?: string }): Promise<ProfileEntity>;
}

export interface ProfileOutPort {
  save(profileEntity: ProfileEntity): Promise<ProfileEntity>;
  findByUid(uid: string): Promise<ProfileEntity | null>;
}
