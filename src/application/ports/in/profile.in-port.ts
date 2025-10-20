import { CreateProfileDTO } from '@application/dtos/create-profile.dto';
import { CreateProfileResult } from '@application/types/profile-use-case.type';

export const PROFILE_IN_PORT = Symbol('PROFILE_IN_PORT');

export interface ProfileInPort {
  createProfile(dto: CreateProfileDTO): Promise<CreateProfileResult>;
}
