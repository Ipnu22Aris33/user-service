import { TokenEntity } from '@domain/entities/token.entity';
import { TokenTypeEnum } from '@domain/enums/token-type.enum';
import { UnauthorizedException } from '@nestjs/common';

const DEFAULT_EXPIRES_MS: Record<TokenTypeEnum, number> = {
  [TokenTypeEnum.ACCESS]: 15 * 60 * 1000,
  [TokenTypeEnum.REFRESH]: 7 * 24 * 60 * 60 * 1000,
  [TokenTypeEnum.VERIFICATION]: 1 * 60 * 60 * 1000,
  [TokenTypeEnum.RESET_PASSWORD]: 1 * 60 * 60 * 1000,
};

export class TokenHelper {
  // Stateless, tidak pakai constructor
  static async generateToken(
    jwtService: { sign(payload: any, options?: any): Promise<string> },
    props: { uid: string; roleUid: string | null; type: TokenTypeEnum },
  ): Promise<TokenEntity> {
    const issuedAt = new Date();
    const expiresInMs = DEFAULT_EXPIRES_MS[props.type];
    const expiresAt = new Date(issuedAt.getTime() + expiresInMs);

    const jwt = await jwtService.sign(
      { sub: props.uid, role: props.roleUid, type: props.type },
      { expiresIn: `${expiresInMs / 1000}s` },
    );

    return TokenEntity.create({
      userUid: props.uid,
      tokenType: props.type,
      token: jwt,
      expiresAt,
      issuedAt,
      actor: props.uid,
    });
  }

  static async verifyToken(
    jwtService: { verify(token: string): Promise<any> },
    token: string,
    expectedType?: TokenTypeEnum,
  ): Promise<{ sub: string; role: string; type: TokenTypeEnum }> {
    try {
      const payload = await jwtService.verify(token);

      if (expectedType && payload.type !== expectedType) {
        throw new UnauthorizedException(`Token type mismatch. Expected: ${expectedType}`);
      }

      return payload;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  static getExpiresAt(type: TokenTypeEnum): Date {
    const expiresInMs = DEFAULT_EXPIRES_MS[type];
    return new Date(Date.now() + expiresInMs);
  }
}
