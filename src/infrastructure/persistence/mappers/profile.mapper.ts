import { ProfileEntity } from '@domain/entities/profile.entity';
import { ProfileModel } from '../models/profile.model';

export class ProfileMapper {
  static toPersistense(profile: ProfileEntity): ProfileModel {
    return {
      uid: profile.getUid(),
      userUid: profile.getUserUid(),
      fullName: profile.getFullName(),
      phoneNumber: profile.getPhoneNumber(),
      profileStatus: profile.getProfileStatus(),
      createdAt: profile.getCreatedAt(),
      updatedAt: profile.getUpdatedAt(),
    };
  }
}
