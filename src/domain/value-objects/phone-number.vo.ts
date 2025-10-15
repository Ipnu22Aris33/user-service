import { BaseVO } from '@domain/base/base.vo';
import { BadRequestException, UnprocessableEntityException } from '@nestjs/common';

export class PhoneNumberVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): PhoneNumberVO {
    this.validate(value);
    return new PhoneNumberVO(value);
  }

  static fromValue(value: string): PhoneNumberVO {
    return new PhoneNumberVO(value);
  }

  private static validate(value: string) {
    if (!value) throw new BadRequestException('Phone number is required');
    if (!/^\+?[1-9]\d{7,14}$/.test(value)) throw new UnprocessableEntityException('Invalid phone number');
  }
}
