import {
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';

export class PhoneNumberVO {
  constructor(private readonly value: string) {}

  static create(value: string): PhoneNumberVO {
    this.validate(value);
    return new PhoneNumberVO(value);
  }

  static fromValue(value: string): PhoneNumberVO {
    return new PhoneNumberVO(value);
  }

  getValue() {
    return this.value;
  }

  equal(other: PhoneNumberVO) {
    return this.value === other.value;
  }

  private static validate(value: string) {
    if (!value) throw new BadRequestException('Phone number is required');
    if (!/^\+?[1-9]\d{7,14}$/.test(value)) throw new UnprocessableEntityException('Invalid phone number');
  }
}
