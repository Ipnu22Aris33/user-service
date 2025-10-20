import { CreateProfileDTO } from '@application/dtos/create-profile.dto';
import { ProfileInPort } from '@application/ports/in/profile.in-port';
import { ProfileService } from '@application/services/profile.service';
import { ProfileFactory } from '@domain/factories/profile.factory';
import { NameVO, PhoneNumberVO, UidVO } from '@domain/value-objects';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileUseCase implements ProfileInPort {
  constructor(private readonly profileService: ProfileService) {}
  async createProfile(dto: CreateProfileDTO) {
    const profile = new ProfileFactory().createNew({
      props: {
        userUid: UidVO.create(dto.userUid),
        fullName: NameVO.create(dto.fullName),
        phoneNumber: PhoneNumberVO.create(dto.phoneNumber),
      },
    });
    await this.profileService.save(profile);
    const result = {
      profile,
      message: '',
    };
    return result;
  }
}
