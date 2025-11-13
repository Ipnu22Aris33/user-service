import { ProfileEntity } from '@domain/entities/profile.entity';

export interface CreateProfileInputType {
  userUid: string;
  fullName: string;
  phoneNumber: string;
}
