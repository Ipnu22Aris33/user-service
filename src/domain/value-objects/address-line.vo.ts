import { BaseVO } from '@domain/base/base.vo';
import { BadRequestException, UnprocessableEntityException } from '@nestjs/common';

export class AddressLineVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): AddressLineVO {
    this.validate(value);
    return new AddressLineVO(value);
  }

  static createOptional(value: string | null): AddressLineVO | null {
    return value === null ? null : this.create(value);
  }

  static fromValue(value: string): AddressLineVO {
    return new AddressLineVO(value);
  }

  static fromOptionalValue(value: string | null): AddressLineVO | null {
    return value === null ? null : this.fromValue(value);
  }

  private static validate(value: string) {
    if (!value) throw new BadRequestException('Address line is required');
    if (value.trim().length === 0) throw new BadRequestException('Address line invalid');
    if (value.length > 254) throw new UnprocessableEntityException('Address line is too long');
    if (!/^[a-zA-Z\s]+$/.test(value)) throw new BadRequestException('Address line invalid');
  }
}
