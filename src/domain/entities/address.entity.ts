import {
  NameVO,
  PhoneNumberVO,
  UidVO,
  AddressLineVO,
  LabelVO,
  PostalCodeVO,
} from '@domain/value-objects';

export interface AddressEntityProps {
  uid: UidVO;
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
  isActive: boolean;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class AddressEntity {
  constructor(private readonly props: AddressEntityProps) {}

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  updateAddressLine1(newLine1: AddressLineVO): void {
    if (this.props.addressLine1.equals(newLine1)) return;
    this.props.addressLine1 = newLine1;
    this.touch();
  }

  updateAddressLine2(newLine2: AddressLineVO): void {
    if (this.props.addressLine2?.equals(newLine2)) return;
    this.props.addressLine2 = newLine2;
    this.touch();
  }

  updateRecipient(name: NameVO, phoneNumber: PhoneNumberVO): void {
    if (
      this.props.recipientName.equals(name) ||
      this.props.phoneNumber.equals(phoneNumber)
    )
      return;
    this.props.recipientName = name;
    this.props.phoneNumber = phoneNumber;
    this.touch();
  }

  softDelete(): void {
    this.props.deletedAt = new Date();
    this.props.isActive = false;
    this.touch();
  }

  // Getter Methods
  getUid(): string {
    return this.props.uid.getValue();
  }

  getUserUid(): string {
    return this.props.userUid.getValue();
  }

  getLabel(): string {
    return this.props.label.getValue();
  }

  getRecipientName(): string {
    return this.props.recipientName.getValue();
  }

  getPhoneNumber(): string {
    return this.props.phoneNumber.getValue();
  }

  getAddressLine1(): string {
    return this.props.addressLine1.getValue();
  }

  getAddressLine2(): string | undefined {
    return this.props.addressLine2?.getValue();
  }

  getCity(): string {
    return this.props.city;
  }

  getRegion(): string {
    return this.props.region;
  }

  getCountry(): string {
    return this.props.country;
  }

  getPostalCode(): string {
    return this.props.postalCode.getValue();
  }

  getIsActive(): boolean {
    return this.props.isActive;
  }

  getIsDefault(): boolean {
    return this.props.isDefault;
  }

  getCreatedAt(): Date {
    return this.props.createdAt;
  }

  getUpdatedAt(): Date {
    return this.props.updatedAt;
  }

  getDeletedAt(): Date | null {
    return this.props.deletedAt;
  }

  // toObject for persistence or API response
  toObject() {
    return {
      uid: this.getUid(),
      userUid: this.getUserUid(),
      label: this.getLabel(),
      recipientName: this.getRecipientName(),
      phoneNumber: this.getPhoneNumber(),
      addressLine1: this.getAddressLine1(),
      addressLine2: this.getAddressLine2(),
      city: this.getCity(),
      region: this.getRegion(),
      country: this.getCountry(),
      postalCode: this.getPostalCode(),
      isActive: this.getIsActive(),
      isDefault: this.getIsDefault(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
      deletedAt: this.getDeletedAt(),
    };
  }
}
