export class EmailVO {
  private constructor(private readonly value: string) {}

  static create(value: string): EmailVO {
    this.validate(value);
    value = value.toLowerCase();
    return new EmailVO(value);
  }

  static fromValue(value: string): EmailVO {
    return new EmailVO(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: EmailVO) {
    return this.value === other.value;
  }

  private static validate(value: string) {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
      throw new Error('Email invalid');
    if (value.length > 254) throw new Error('Email is too long');
    if (!value) throw new Error('Email is required');
    if (value.trim().length === 0) throw new Error('Email invalid');
  }
}
