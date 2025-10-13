export abstract class BaseVO<TValue> {
  protected readonly value: TValue;

  protected constructor(value: TValue) {
    this.value = value;
  }
  getValue(): TValue {
    return this.value;
  }

  equals(other: BaseVO<TValue>): boolean {
    if (!other) return false;
    return this.value === other.getValue();
  }
}
