import { BaseEntity, BaseEntityProps } from '@domain/base/base.entity';
import {
  NameVO,
  PhoneNumberVO,
  UidVO,
  AddressLineVO,
  LabelVO,
  PostalCodeVO,
  ActivateStatusVO,
  ActivateStatusEnumType,
} from '@domain/value-objects';

export interface AddressEntityProps extends BaseEntityProps {
  userUid: UidVO;
  label: LabelVO;
  recipientName: NameVO;
  phoneNumber: PhoneNumberVO;
  addressLine1: AddressLineVO;
  addressLine2: AddressLineVO | null;
  city: string;
  region: string;
  country: string;
  postalCode: PostalCodeVO;
  status: ActivateStatusVO;
  isDefault: boolean;
}
export class AddressEntity extends BaseEntity<AddressEntityProps> {
  private constructor(props: AddressEntityProps) {
    super(props);
  }

  static create(props: AddressEntityProps): AddressEntity {
    return new AddressEntity(props);
  }

  static reconstruct(props: AddressEntityProps): AddressEntity {
    return new AddressEntity(props);
  }

  setAsDefault(actor?: UidVO): void {
    if (this.props.isDefault == true) return;
    this.props.isDefault = true;
    this.touch(actor);
  }

  unsetDefault(actor?: UidVO) {
    if (this.props.isDefault == false) return;
    this.props.isDefault = false;
    this.touch(actor);
  }

  activate(actor?: UidVO): void {
    if (this.props.status.getValue() !== ActivateStatusEnumType.ACTIVE) {
      this.props.status = ActivateStatusVO.create(
        ActivateStatusEnumType.ACTIVE,
      );
      this.touch(actor);
    }
  }

  deActivate(actor?: UidVO): void {
    if (this.props.status.getValue() !== ActivateStatusEnumType.INACTIVE) {
      this.props.status = ActivateStatusVO.create(
        ActivateStatusEnumType.INACTIVE,
      );
      this.touch(actor);
    }
  }

  getProps(): AddressEntityProps {
    return this.props;
  }

  getLabelValue(): string {
    return this.props.label.getValue();
  }

  getRecipientNameValue(): string {
    return this.props.recipientName.getValue();
  }

  getPhoneNumberValue(): string {
    return this.props.phoneNumber.getValue();
  }

  getAddressLine1Value(): string {
    return this.props.addressLine1.getValue();
  }

  getAddressLine2Value(): string | null {
    return this.props.addressLine2?.getValue() ?? null;
  }

  getCityValue(): string {
    return this.props.city;
  }

  getRegionValue(): string {
    return this.props.region;
  }

  getCountryValue(): string {
    return this.props.country;
  }

  getPostalCodeValue(): string {
    return this.props.postalCode.getValue();
  }

  getStatusValue(): ActivateStatusEnumType {
    return this.props.status.getValue();
  }
}
