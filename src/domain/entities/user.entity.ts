import {
  UidVO,
  EmailVO,
  NameVO,
  PhoneNumberVO,
  StatusVO,
  StatusEnumType,
} from '@domain/value-objects';

export interface UserEntityProps {
  uid: UidVO;
  name: NameVO;
  phoneNumber: PhoneNumberVO;
  email: EmailVO;
  status: StatusVO;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class UserEntity {
  constructor(private readonly props: UserEntityProps) {}

  private touch() {
    this.props.updatedAt = new Date();
  }

  changeName(name: NameVO) {
    if (!this.props.name.equals(name)) {
      this.props.name = name;
      this.touch();
    }
  }

  changeEmail(email: EmailVO) {
    if (!this.props.email.equals(email)) {
      this.props.email = email;
      this.touch();
    }
  }

  changeStatus(status: StatusVO): void {
    if (!this.props.status.equals(status)) {
      this.props.status = status
      this.touch();
    }
  }

  /** Getters */
  getUid(): string {
    return this.props.uid.getValue();
  }

  getName(): string {
    return this.props.name.getValue();
  }

  getEmail(): string {
    return this.props.email.getValue();
  }

  getPhoneNumber(): string {
    return this.props.phoneNumber.getValue();
  }

  getStatus(): string {
    return this.props.status.getValue();
  }

  getCreatedAt(): Date {
    return this.props.createdAt;
  }

  getUpdatedAt(): Date {
    return this.props.updatedAt;
  }

  // optional: untuk persistence / API
  toObject() {
    return {
      uid: this.getUid(),
      name: this.getName(),
      email: this.getEmail(),
      phoneNumber: this.getPhoneNumber(),
      status: this.getStatus(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
    };
  }
}
