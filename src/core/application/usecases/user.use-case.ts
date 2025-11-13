import { ProfileEntity } from '@domain/entities/profile.entity';
import { UserEntity } from '@domain/entities/user.entity';
import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { TokenHelper } from '@application/helper/token.helper';
import { TokenTypeEnum } from '@domain/enums/token-type.enum';
import { PROFILE_OUT_PORT, type ProfileOutPort } from '@application/ports/profile.port';
import { PASSWORD_HASHER_PORT, type PasswordHasherPort } from '@application/ports/password-hasher.port';
import { USER_OUT_PORT, type UserOutPort, type UserInPort } from '@application/ports/user.port';
import { JWT_SERVICE_PORT, type JwtServicePort } from '@application/ports/jwt-service.port';
import { TOKEN_OUT_PORT, type TokenOutPort } from '@application/ports/token.port';
import {
  SignInInputType,
  SignInOutputType,
  SignUpInputType,
  SignUpOutputType,
} from '@application/types/user-use-case.type';

@Injectable()
export class UserUseCase implements UserInPort {
  constructor(
    @Inject(USER_OUT_PORT) private readonly userOutPort: UserOutPort,
    @Inject(PROFILE_OUT_PORT) private readonly profileOutPort: ProfileOutPort,
    @Inject(PASSWORD_HASHER_PORT) private readonly passwordHasher: PasswordHasherPort,
    @Inject(JWT_SERVICE_PORT) private readonly jwtServicePort: JwtServicePort,
    @Inject(TOKEN_OUT_PORT) private readonly tokenOutPort: TokenOutPort,
  ) {}

  async signIn(props: SignInInputType): Promise<SignInOutputType> {
    const user = await this.userOutPort.findByEmail(props.email);
    if (!user) throw new NotFoundException('User not found');
    console.log(user);
    const isPasswordValid = await this.passwordHasher.compare(props.password, user.getPasswordHash());
    if (!isPasswordValid) throw new UnprocessableEntityException('Invalid password');

    const [accessToken, refreshToken] = await Promise.all([
      TokenHelper.generateToken(this.jwtServicePort, {
        uid: user.get('uid'),
        roleUid: user.get('roleUid'),
        type: TokenTypeEnum.ACCESS,
      }),
      TokenHelper.generateToken(this.jwtServicePort, {
        uid: user.get('uid'),
        roleUid: user.get('roleUid'),
        type: TokenTypeEnum.REFRESH,
      }),
    ]);

    const [savedAccessToken, savedRefreshToken] = await Promise.all([
      this.tokenOutPort.save(accessToken),
      this.tokenOutPort.save(refreshToken),
    ]);

    user.signIn();

    return { user, accessToken: savedAccessToken.get('token'), refreshToken: savedRefreshToken.get('token') };
  }

  async signUp(props: SignUpInputType): Promise<SignUpOutputType> {
    const user = UserEntity.create({
      email: props.email,
      passwordHash: await this.passwordHasher.hash(props.password),
    });
    console.log('user signup', user);

    const savedUser = await this.userOutPort.save(user);
    console.log('savedUser', savedUser);

    const profile = ProfileEntity.create({
      userUid: savedUser.get('uid'),
      fullName: props.fullName,
      phoneNumber: props.phoneNumber,
    });

    const savedProfile = await this.profileOutPort.save(profile);

    return { user: savedUser, profile: savedProfile };
  }

  // async signOut(uid: string): Promise<UserEntity> {
  //   return await this.userOutPort.signOut(uid);
  // }
}
