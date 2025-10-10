export class LabelVO {
  private constructor(private readonly value: string) {}

  static create(value: string): LabelVO {
    this.validate(value);
    return new LabelVO(value);
  }

  static fromValue(value: string): LabelVO {
    return new LabelVO(value);
  }

  getValue() {
    return this.value;
  }

  equals(other: LabelVO) {
    return this.value === other.value;
  }

  private static validate(value: string) {
    if (!value) throw new Error('Name is required');
    if (value.trim().length === 0) throw new Error('Name invalid');
    if (value.length > 50) throw new Error('Name is too long');
    if (!/^[a-zA-Z\s]+$/.test(value)) throw new Error('Name invalid');
  }
}
