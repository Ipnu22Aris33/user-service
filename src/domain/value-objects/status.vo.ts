import { UnprocessableEntityException } from "@nestjs/common";

export enum StatusType {
  PENDING = 'pending',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BANNED = 'banned',
}

export class StatusVO {
  constructor(private readonly value: StatusType) {}

  static create(value: StatusType): StatusVO {
    this.validate(value);
    return new StatusVO(value);
  }

  static fromValue(value: StatusType): StatusVO {
    return new StatusVO(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: StatusVO) {
    return this.value === other.value;
  }

  private static validate(value: StatusType): void {
    const allowed = Object.values(StatusType);
    if (!allowed.includes(value)) {
      throw new UnprocessableEntityException(`Invalid status type: ${value}`);
    }
  }
}
