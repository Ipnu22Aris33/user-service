import { USER_IN_PORT, type UserInPort } from '@core/application/ports/user.port';
import { Body, Controller, Inject, Post, UnauthorizedException, Headers } from '@nestjs/common';

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
    return this.userInPort.signIn(body);
  }

  @Post('sign-out')
  async signOut(@Headers('authorization') authHeader: string) {
    const token = this.extractBearerToken(authHeader);
    return this.userInPort.signOut(token);
  }

  @Post('reset-password-request')
  async resetPasswordRequest(@Body() body: { email: string }) {
    return this.userInPort.resetPasswordRequest(body);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { password: string }, @Headers('authorization') authHeader: string) {
    const token = this.extractBearerToken(authHeader);
    return this.userInPort.resetPassword({ ...body, token });
  }

  private extractBearerToken(authHeader: string): string {
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token');
    }
    return authHeader.replace('Bearer ', '').trim();
  }
}
