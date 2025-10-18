import { ProfileStatusEnumType } from '@domain/value-objects/profile-status.vo';
import { BaseModel } from './base.model';

export class ProfileModel extends BaseModel {
  userUid: string;
  fullName: string;
  phoneNumber: string;
  profileStatus: ProfileStatusEnumType;
}
