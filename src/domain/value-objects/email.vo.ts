import { BaseVO } from '@domain/base/base.vo';

export class EmailVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): EmailVO {
    this.validate(value);
    value = value.toLowerCase();
    return new EmailVO(value);
  }

  static fromValue(value: string): EmailVO {
    return new EmailVO(value);
  }

  private static validate(value: string) {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
      throw new Error('Email invalid');
    if (value.length > 254) throw new Error('Email is too long');
    if (!value) throw new Error('Email is required');
    if (value.trim().length === 0) throw new Error('Email invalid');
  }
}
