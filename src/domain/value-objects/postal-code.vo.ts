import { BaseVO } from '@domain/base/base.vo';
import { BadRequestException, UnprocessableEntityException } from '@nestjs/common';

export class PostalCodeVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): PostalCodeVO {
    this.validate(value);
    return new PostalCodeVO(value);
  }

  static fromValue(value: string): PostalCodeVO {
    return new PostalCodeVO(value);
  }

  private static validate(value: string): void {
    if (!value) throw new BadRequestException('Postal code is required');
    const trimmed = value.trim();
    if (trimmed.length === 0) throw new BadRequestException('Postal code cannot be empty');
    if (!/^\d{5}$/.test(trimmed)) throw new UnprocessableEntityException('Postal code must be 5 digits');
  }
}
