import { ProfileEntity } from '@core/domain/entities/profile.entity';
import { UserEntity } from '@core/domain/entities/user.entity';
import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { TokenHelper } from '@core/application/helper/token.helper';
import { TokenTypeEnum } from 'src/core/common/enums/token-type.enum';
import { PROFILE_OUT_PORT, type ProfileOutPort } from '@core/application/ports/profile.port';
import { PASSWORD_HASHER_PORT, type PasswordHasherPort } from '@core/application/ports/password-hasher.port';
import { USER_OUT_PORT, type UserOutPort, type UserInPort } from '@core/application/ports/user.port';
import { JWT_SERVICE_PORT, type JwtServicePort } from '@core/application/ports/jwt-service.port';
import { TOKEN_OUT_PORT, type TokenOutPort } from '@core/application/ports/token.port';
import {
  SignInInputType,
  SignInOutputType,
  SignUpInputType,
  SignUpOutputType,
} from '@core/common/types/user-use-case.type';

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

    const savedToken = await this.tokenOutPort.save(refreshToken);

    user.signIn();

    return { user, accessToken: accessToken.get('token'), refreshToken: savedToken.get('token') };
  }

  async signUp(props: SignUpInputType): Promise<SignUpOutputType> {
    const user = UserEntity.create({
      email: props.email,
      passwordHash: await this.passwordHasher.hash(props.password),
    });

    const savedUser = await this.userOutPort.save(user);

    const profile = ProfileEntity.create({
      userUid: savedUser.get('uid'),
      fullName: props.fullName,
      phoneNumber: props.phoneNumber,
    });

    const savedProfile = await this.profileOutPort.save(profile);

    return { user: savedUser, profile: savedProfile };
  }

  async resetPasswordRequest(props: { email: string }) {
    const user = await this.userOutPort.findByEmail(props.email);
    if (!user) throw new NotFoundException('User not found');

    const resetToken = await TokenHelper.generateToken(this.jwtServicePort, {
      uid: user.get('uid'),
      roleUid: user.get('roleUid'),
      type: TokenTypeEnum.RESET_PASSWORD,
    });

    return await this.tokenOutPort.save(resetToken);
  }

  async resetPassword(props: { token: string; password: string }) {
    const token = await this.tokenOutPort.findByToken(props.token);
    if (!token) throw new NotFoundException('Token not found');
    const isTokenValid = await TokenHelper.verifyToken(
      this.jwtServicePort,
      token.get('token'),
      TokenTypeEnum.RESET_PASSWORD,
    );
    if (!isTokenValid) throw new UnprocessableEntityException('Invalid token');
    if (token.get('isRevoked')) throw new UnprocessableEntityException('Token revoked');

    const user = await this.userOutPort.findByUid(token.get('userUid'));
    if (!user) throw new NotFoundException('User not found');

    user.updatePasswordHash(await this.passwordHasher.hash(props.password), user.get('passwordHash'));
    const savedUser = await this.userOutPort.save(user);
    token.revoke(savedUser.get('uid'));
    await this.tokenOutPort.save(token);
    return savedUser;
  }

  async signOut(token: string): Promise<UserEntity> {
    const isTokenValid = await TokenHelper.verifyToken(
      this.jwtServicePort,
      token,
      TokenTypeEnum.ACCESS,
    );
    if (!isTokenValid) throw new UnprocessableEntityException('Invalid token');
    const user = await this.userOutPort.findByUid(isTokenValid.sub);
    if (!user) throw new NotFoundException('User not found');
    const tokenEntity = await this.tokenOutPort.findByUserUid(user.get('uid'));
    console.log('tokenEntityrr', tokenEntity);
    if(!tokenEntity) throw new NotFoundException('Token not found');
    tokenEntity.revoke(user.get('uid'));
    await this.tokenOutPort.save(tokenEntity);
    user.signOut();
    return await this.userOutPort.save(user);
  }
}
