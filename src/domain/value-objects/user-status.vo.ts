import { BaseVO } from '@domain/base/base.vo';
import { UnprocessableEntityException } from '@nestjs/common';

export enum UserStatusEnumType {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BANNED = 'BANNED',
}

export class UserStatusVO extends BaseVO<UserStatusEnumType> {
  private constructor(value: UserStatusEnumType) {
    super(value);
  }

  static create(value: UserStatusEnumType): UserStatusVO {
    const normalize = this.normalize(value)
    this.validate(normalize);
    return new UserStatusVO(normalize);
  }

  static fromValue(value: UserStatusEnumType): UserStatusVO {
    return new UserStatusVO(value);
  }

  private static normalize(
    value: string | UserStatusEnumType,
  ): UserStatusEnumType {
    if (!value) {
      throw new UnprocessableEntityException('Status tidak boleh kosong');
    }

    // Jika sudah enum, langsung return
    if (
      Object.values(UserStatusEnumType).includes(value as UserStatusEnumType)
    ) {
      return value as UserStatusEnumType;
    }

    // Jika string biasa, ubah jadi uppercase dan cek apakah valid
    const upperValue = value
      .toString()
      .toUpperCase() as keyof typeof UserStatusEnumType;

    if (!(upperValue in UserStatusEnumType)) {
      throw new UnprocessableEntityException(
        `Invalid status value: ${value}. Allowed: ${Object.values(UserStatusEnumType).join(', ')}`,
      );
    }

    return UserStatusEnumType[upperValue];
  }

  private static validate(value: UserStatusEnumType): void {
    const allowed = Object.values(UserStatusEnumType);
    if (!allowed.includes(value)) {
      throw new UnprocessableEntityException(
        `Invalid order status type: ${value}`,
      );
    }
  }
}
