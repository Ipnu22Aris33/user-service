import { BaseEntity, BaseEntityProps } from '@domain/base/base.entity';
import { NameVO, PhoneNumberVO, UidVO } from '@domain/value-objects';
import { AddressEntity } from './address.entity';
import { ProfileStatusEnumType, ProfileStatusVO } from '@domain/value-objects/profile-status.vo';

export interface ProfileEntityProps extends BaseEntityProps {
  userUid: UidVO;
  fullName: NameVO;
  phoneNumber: PhoneNumberVO;
  avatarUrl?: string;
  profileStatus: ProfileStatusVO;
}

export class ProfileEntity extends BaseEntity<ProfileEntityProps> {
  private constructor(
    props: ProfileEntityProps,
    private addresses: AddressEntity[] = [],
  ) {
    super(props);
  }

  static create(props: ProfileEntityProps): ProfileEntity {
    return new ProfileEntity(props);
  }

  static reconstruct(props: ProfileEntityProps): ProfileEntity {
    return new ProfileEntity(props);
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
      (address) => address.getUid() === addressUid.getValue(),
    );
    target?.setAsDefault(actor);
  }

  changeFullName(props: { newFullName: NameVO; actor?: UidVO }) {
    const { newFullName, actor } = props;
    if (this.props.fullName.equals(newFullName)) return;
    this.props.fullName = newFullName;
    this.touch(actor);
  }

  changeProfileStatus(props: {
    newProfileStatus: ProfileStatusVO;
    actor?: UidVO;
  }) {
    const { newProfileStatus, actor } = props;
    if (this.props.profileStatus.equals(newProfileStatus)) return;
    this.props.profileStatus = newProfileStatus;
    this.touch(actor);
  }

  changePhoneNumber(props: { newPhoneNumber: PhoneNumberVO; actor?: UidVO }) {
    const { newPhoneNumber, actor } = props;
    if (this.props.phoneNumber.equals(newPhoneNumber)) return;
    this.props.phoneNumber = newPhoneNumber;
    this.touch(actor);
  }

  getUserUid(): string {
    return this.props.userUid.getValue();
  }
  getFullName(): string {
    return this.props.fullName.getValue();
  }
  getPhoneNumber(): string {
    return this.props.phoneNumber.getValue();
  }
  getProfileStatus(): ProfileStatusEnumType {
    return this.props.profileStatus.getValue();
  }
}
