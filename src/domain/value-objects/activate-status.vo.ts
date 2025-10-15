import { BaseVO } from '@domain/base/base.vo';
import { UnprocessableEntityException } from '@nestjs/common';

export enum ActivateStatusEnumType {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class ActivateStatusVO extends BaseVO<ActivateStatusEnumType> {
  private constructor(value: ActivateStatusEnumType) {
    super(value);
  }

  static create(value: ActivateStatusEnumType): ActivateStatusVO {
    this.validate(value);
    return new ActivateStatusVO(value);
  }

  static fromValue(value: ActivateStatusEnumType): ActivateStatusVO {
    return new ActivateStatusVO(value);
  }

  private static validate(value: ActivateStatusEnumType): void {
    const allowed = Object.values(ActivateStatusEnumType);
    if (!allowed.includes(value)) {
      throw new UnprocessableEntityException(`Invalid status type: ${value}`);
    }
  }
}
