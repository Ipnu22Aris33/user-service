import {
  PROFILE_IN_PORT,
  type ProfileInPort,
} from '@application/ports/in/profile.in-port';
import { Body, Controller, Inject, Param, Post } from '@nestjs/common';

@Controller('profile')
export class ProfileController {
  constructor(
    @Inject(PROFILE_IN_PORT) private readonly profileInPort: ProfileInPort,
  ) {}

  @Post('create/:uid')
  async createProfile(
    @Param() param: { uid: string },
    @Body() body: { fullName: string; phoneNumber: string },
  ) {
    return await this.profileInPort.createProfile({
      ...body,
      userUid: param.uid,
    });
  }
}
