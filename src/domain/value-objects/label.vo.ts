import { BaseVO } from '@domain/base/base.vo';
import { BadRequestException } from '@nestjs/common';
import { UnprocessableEntityException } from '@nestjs/common';

export class LabelVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): LabelVO {
    this.validate(value);
    return new LabelVO(value);
  }

  static fromValue(value: string): LabelVO {
    return new LabelVO(value);
  }

  private static validate(value: string) {
    if (!value) throw new BadRequestException('Label is required');
    if (value.trim().length === 0) throw new BadRequestException('Label invalid');
    if (value.length > 50) throw new UnprocessableEntityException('Label is too long');
    if (!/^[a-zA-Z\s]+$/.test(value)) throw new UnprocessableEntityException('Label invalid');
  }
}
