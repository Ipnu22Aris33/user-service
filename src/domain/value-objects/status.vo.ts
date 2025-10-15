import { BaseVO } from '@domain/base/base.vo';
import { UnprocessableEntityException } from '@nestjs/common';

export enum StatusEnumType {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BANNED = 'BANNED',
}

export class StatusVO extends BaseVO<StatusEnumType> {
  private constructor(value: StatusEnumType) {
    super(value)
  }

  static create(value: StatusEnumType): StatusVO {
    this.validate(value);
    return new StatusVO(value);
  }

  static fromValue(value: StatusEnumType): StatusVO {
    return new StatusVO(value);
  }


  private static validate(value: StatusEnumType): void {
    const allowed = Object.values(StatusEnumType);
    if (!allowed.includes(value)) {
      throw new UnprocessableEntityException(`Invalid status type: ${value}`);
    }
  }
}
