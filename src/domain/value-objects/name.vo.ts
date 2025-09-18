export class NameVO {
  private constructor(private readonly value: string) {}

  static create(value: string): NameVO {
    this.validate(value);
    return new NameVO(value);
  }

  static fromValue(value: string): NameVO {
    return new NameVO(value);
  }

  getValue() {
    return this.value;
  }

  equals(other: NameVO) {
    return this.value === other.value;
  }

  private static validate(value: string) {
    if (!value) throw new Error('Name is required');
    if (value.trim().length === 0) throw new Error('Name invalid');
    if (value.length > 254) throw new Error('Name is too long');
    if (!/^[a-zA-Z\s]+$/.test(value)) throw new Error('Name invalid');
  }
}
