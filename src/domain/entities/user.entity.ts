import {
  UidVO,
  EmailVO,
  NameVO,
  RoleVO,
  PhoneNumberVO,
} from '@domain/value-objects';

export interface UserEntityProps {
  uid: UidVO;
  name: NameVO;
  phoneNumber: PhoneNumberVO;
  email: EmailVO;
  role: RoleVO;
  createdAt: Date;
  updatedAt: Date;
}

export class UserEntity {
  private readonly _uid: UidVO;
  private _name: NameVO;
  private _email: EmailVO;
  private _phoneNumber: PhoneNumberVO;
  private _role: RoleVO;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: UserEntityProps) {
    this._uid = props.uid;
    this._name = props.name;
    this._email = props.email;
    this._phoneNumber = props.phoneNumber; 
    this._role = props.role;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  private touch() {
    this._updatedAt = new Date();
  }

  //==> Name
  changeName(name: NameVO) {
    if (this._name.equals(name)) return;
    this._name = name;
    this.touch();
  }

  get name(): string {
    return this._name.getValue();
  }

  //==> Email
  changeEmail(email: EmailVO) {
    if (this._email.equals(email)) return;
    this._email = email;
    this.touch();
  }

  get email(): string {
    return this._email.getValue();
  }

  //==> Role
  changeRole(role: RoleVO) {
    if (this._role.equals(role)) return;
    this._role = role;
    this.touch();
  }

  get role(): string {
    return this._role.getValue();
  }

  //==> UID & Timestamps
  get uid(): string {
    return this._uid.getValue();
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
