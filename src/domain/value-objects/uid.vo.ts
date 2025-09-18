import { v4 as uuidV4 } from 'uuid';

export class UidVO {
  private constructor(private readonly value: string) {}

  static create(): UidVO {
    return new UidVO(uuidV4());
  }

  static fromValue(value: string): UidVO {
    return new UidVO(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UidVO) {
    return this.value === other.value;
  }
}
