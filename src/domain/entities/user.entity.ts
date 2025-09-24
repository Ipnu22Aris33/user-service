import {
  UidVO,
  EmailVO,
  NameVO,
  PhoneNumberVO,
  StatusVO,
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
  // immutable
  private readonly _uid: UidVO;
  private readonly _createdAt: Date;

  // mutable
  private _name: NameVO;
  private _email: EmailVO;
  private _phoneNumber: PhoneNumberVO;
  private _status: StatusVO;
  private _updatedAt: Date;

  constructor(props: UserEntityProps) {
    this._uid = props.uid;
    this._name = props.name;
    this._email = props.email;
    this._phoneNumber = props.phoneNumber;
    this._status = props.status;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  private touch() {
    this._updatedAt = new Date();
  }

  changeName(name: NameVO) {
    if (!this._name.equals(name)) {
      this._name = name;
      this.touch();
    }
  }

  changeEmail(email: EmailVO) {
    if (!this._email.equals(email)) {
      this._email = email;
      this.touch();
    }
  }

  changeStatus(status: StatusVO): void {
    if (!this._status.equals(status)) {
      this._status = status;
      this.touch();
    }
  }

  /** Getters */
  getUid(): string {
    return this._uid.getValue();
  }

  getName(): string {
    return this._name.getValue();
  }

  getEmail(): string {
    return this._email.getValue();
  }

  getPhoneNumber(): string {
    return this._phoneNumber.getValue();
  }

  getStatus(): string {
    return this._status.getValue();
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
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
