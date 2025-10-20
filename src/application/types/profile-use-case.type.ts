import { ProfileEntity } from '@domain/entities/profile.entity';

export type CreateProfileResult = {
  profile: ProfileEntity;
  message: string;
};
