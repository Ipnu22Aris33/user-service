import { CreateProfileServiceDTO } from '@application/dtos/service-dtos/profile-dtos/create-profile.dto';
import {
  PROFILE_PORT,
  type ProfilePort,
} from '@application/ports/profile.port';
import { ProfileFactory } from '@domain/factories/profile.factory';
import { NameVO, PhoneNumberVO, UidVO } from '@domain/value-objects';
import {
  ProfileStatusEnumType,
  ProfileStatusVO,
} from '@domain/value-objects/profile-status.vo';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(PROFILE_PORT)
    private readonly profilePort: ProfilePort,
  ) {}
  async createProfile(dto: CreateProfileServiceDTO) {
    const doc = new ProfileFactory().createNew({
      props: {
        userUid: UidVO.create(dto.userUid),
        fullName: NameVO.create(dto.fullName),
        phoneNumber: PhoneNumberVO.create(dto.phoneNumber),
      },
    });
    return await this.profilePort.save(doc);
  }
}
