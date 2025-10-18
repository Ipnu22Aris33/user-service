import { BaseVO } from '@domain/base/base.vo';
import { UnprocessableEntityException } from '@nestjs/common';

export enum ProfileStatusEnumType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  VERIFIED = 'VERIFIED',
  UNVERIFIED = 'UNVERIFIED',
  DEACTIVATED = 'DEACTIVATED',
}

export class ProfileStatusVO extends BaseVO<ProfileStatusEnumType> {
  private constructor(value: ProfileStatusEnumType) {
    super(value);
  }

  static create(value: ProfileStatusEnumType): ProfileStatusVO {
    this.validate(value);
    return new ProfileStatusVO(value);
  }

  static fromValue(value: ProfileStatusEnumType): ProfileStatusVO {
    return new ProfileStatusVO(value);
  }

  private static validate(value: ProfileStatusEnumType): void {
    const allowed = Object.values(ProfileStatusEnumType);
    if (!allowed.includes(value)) {
      throw new UnprocessableEntityException(`Invalid status type: ${value}`);
    }
  }
}
