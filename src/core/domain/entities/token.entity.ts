import { BaseEntity, WithBaseProps } from 'src/core/common/base/base.entity';
import { TokenTypeEnum } from 'src/core/common/enums/token-type.enum';

export interface TokenProps {
  userUid: string;
  tokenType: TokenTypeEnum;
  token: string;
  expiresAt: Date;
  issuedAt: Date;
  isRevoked: boolean;
}

export interface TokenCreateProps {
  userUid: string;
  tokenType: TokenTypeEnum;
  token: string;
  expiresAt: Date;
  issuedAt: Date;
  actor?: string;
}

export type TokenEntityProps = WithBaseProps<TokenProps>;

export class TokenEntity extends BaseEntity<TokenEntityProps> {
  private constructor(props: TokenEntityProps) {
    super(props);
  }

  static create(props: TokenCreateProps): TokenEntity {
    const base = this.baseDefaults(props.actor);
    const defaults = {
      isRevoked: false,
    };
    const created = {
      ...props,
      ...defaults,
      ...base,
    };
    return new TokenEntity(created);
  }

  revoke(actor?: string): void {
    this.props.isRevoked = true;
    this.touch(actor);
  }

  getUserUid(): string {
    return this.props.userUid;
  }
  getTokenType(): TokenTypeEnum {
    return this.props.tokenType;
  }
  getToken(): string {
    return this.props.token;
  }
  getExpiresAt(): Date {
    return this.props.expiresAt;
  }
  getIssuedAt(): Date {
    return this.props.issuedAt;
  }
  getIsRevoked(): boolean {
    return this.props.isRevoked;
  }
}
