export class AddressLineVO {
  private constructor(private readonly value: string) {}

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

  getValue() {
    return this.value;
  }

  equals(other: AddressLineVO) {
    return this.value === other.value;
  }

  private static validate(value: string) {
    if (!value) throw new Error('Name is required');
    if (value.trim().length === 0) throw new Error('Name invalid');
    if (value.length > 254) throw new Error('Name is too long');
    if (!/^[a-zA-Z\s]+$/.test(value)) throw new Error('Name invalid');
  }
}
