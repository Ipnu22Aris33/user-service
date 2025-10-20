import { Injectable } from '@nestjs/common';
import { CreateProfileDTO } from '@application/dtos/create-profile.dto';
import { ProfileInPort } from '@application/ports/in/profile.in-port';
import { ProfileService } from '@application/services/profile.service';
import { ProfileFactory } from '@domain/factories/profile.factory';
import { NameVO, PhoneNumberVO, UidVO } from '@domain/value-objects';
import { CreateProfileResult } from '@application/types/profile-use-case.type';

@Injectable()
export class ProfileUseCase implements ProfileInPort {
  constructor(private readonly profileService: ProfileService) {}

  async createProfile(dto: CreateProfileDTO): Promise<CreateProfileResult> {
    const profileProps = {
      userUid: UidVO.create(dto.userUid),
      fullName: NameVO.create(dto.fullName),
      phoneNumber: PhoneNumberVO.create(dto.phoneNumber),
    };

    const newProfile = new ProfileFactory().createNew({ props: profileProps });
    await this.profileService.save(newProfile);

    return {
      profile: newProfile,
      message: 'Profile created successfully',
    };
  }
}
