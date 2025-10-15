import { BaseEntity, BaseEntityProps } from '@domain/base/base.entity';
import {
  EmailVO,
  NameVO,
  PhoneNumberVO,
  UidVO,
  UserStatusEnumType,
  UserStatusVO,
} from '@domain/value-objects';
import { AddressEntity } from './address.entity';

export interface UserEntityProps extends BaseEntityProps {
  name: NameVO;
  phoneNumber: PhoneNumberVO;
  email: EmailVO;
  status: UserStatusVO;
}

export class UserEntity extends BaseEntity<UserEntityProps> {
  private constructor(
    props: UserEntityProps,
    private addresses: AddressEntity[] = [],
  ) {
    super(props);
  }

  static create(props: UserEntityProps): UserEntity {
    return new UserEntity(props);
  }

  static reconstruct(props: UserEntityProps): UserEntity {
    return new UserEntity(props);
  }

  setAsDefaultAddress(props: { addressUid: UidVO; actor?: UidVO }) {
    const { addressUid, actor } = props;
    if (!this.addresses || this.addresses.length === 0) return;

    for (const address of this.addresses) {
      if (address.getProps().isDefault) {
        address.unsetDefault(actor);
      }
    }

    const target = this.addresses.find(
      (address) => address.getUidValue() === addressUid.getValue(),
    );
    target?.setAsDefault(actor);
  }

  changeName(props: { newName: NameVO; actor?: UidVO }) {
    const { newName, actor } = props;
    if (!this.props.name.equals(newName)) {
      this.props.name = newName;
      this.touch(actor);
    }
  }

  changeEmail(props: { newEmail: EmailVO; actor?: UidVO }) {
    const { newEmail, actor } = props;
    if (!this.props.email.equals(newEmail)) {
      this.props.email = newEmail;
      this.touch(actor);
    }
  }

  changeStatus(props: { newStatus: UserStatusVO; actor?: UidVO }): void {
    const { newStatus, actor } = props;
    if (!this.props.status.equals(newStatus)) {
      this.props.status = newStatus;
      this.touch(actor);
    }
  }

  getProps(): UserEntityProps {
    return this.props;
  }

  getNameValue(): string {
    return this.props.name.getValue();
  }
  getEmailValue(): string {
    return this.props.email.getValue();
  }
  getPhoneNumberValue(): string {
    return this.props.phoneNumber.getValue();
  }
  getStatusValue(): UserStatusEnumType {
    return this.props.status.getValue();
  }
}
