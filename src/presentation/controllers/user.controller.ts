import { USER_IN_PORT, type UserInPort } from '@application/ports/user.port';
import { Body, Controller, Inject, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(@Inject(USER_IN_PORT) private readonly userInPort: UserInPort) {}

  @Post('sign-up')
  async signUp(
    @Body() body: { email: string; fullName: string; password: string; phoneNumber: string; roleUid: string },
  ) {
    return this.userInPort.signUp(body);
  }

  @Post('sign-in')
  async signIn(@Body() body: { email: string; password: string }) {
    console.log(body);
    return this.userInPort.signIn(body);
  }
}
