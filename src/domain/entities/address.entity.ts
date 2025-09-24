import { PhoneNumberVO, UidVO } from '@domain/value-objects';

export interface AddressEntityProps {
  uid: UidVO;
  userUid: UidVO;
  label: string;
  recipientName: string;
  phoneNumber: PhoneNumberVO;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region: string;
  country: string;
  postalCode: string;
  isActive: boolean;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class AddressEntity {
  private readonly _uid: UidVO;
  private readonly _createdAt: Date;
  private _userUid: UidVO;
  private _label: string;
  private _recipientName: string;
  private _phoneNumber: PhoneNumberVO;
  private _addressLine1: string;
  private _addressLine2?: string;
  private _city: string;
  private _region: string;
  private _country: string;
  private _postalCode: string;
  private _isActive: boolean;
  private _isDefault: boolean;
  private _updatedAt: Date;
  private _deletedAt: Date | null;

  private constructor(props: AddressEntityProps) {
    this._uid = props.uid;
    this._userUid = props.userUid;
    this._label = props.label;
    this._recipientName = props.recipientName;
    this._phoneNumber = props.phoneNumber;
    this._addressLine1 = props.addressLine1;
    this._addressLine2 = props.addressLine2;
    this._city = props.city;
    this._region = props.region;
    this._country = props.country;
    this._postalCode = props.postalCode;
    this._isActive = props.isActive;
    this._isDefault = props.isDefault;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
    this._deletedAt = props.deletedAt;
  }

  private touch(): void {
    this._updatedAt = new Date();
  }

  activate(): void {
    this._isActive = true;
    this.touch();
  }

  deactivate(): void {
    this._isActive = false;
    this.touch();
  }

  markAsDefault(): void {
    this._isDefault = true;
    this.touch();
  }

  unmarkAsDefault(): void {
    this._isDefault = false;
    this.touch();
  }

  updateAddressLine1(newLine1: string): void {
    this._addressLine1 = newLine1;
    this.touch();
  }

  updateAddressLine2(newLine2?: string): void {
    this._addressLine2 = newLine2;
    this.touch();
  }

  updateRecipient(name: string, phoneNumber: PhoneNumberVO): void {
    this._recipientName = name;
    this._phoneNumber = phoneNumber;
    this.touch();
  }

  softDelete(): void {
    this._deletedAt = new Date();
    this._isActive = false;
    this.touch();
  }

  // Getter Methods
  getUid(): string {
    return this._uid.getValue();
  }

  getUserUid(): string {
    return this._userUid.getValue();
  }

  getLabel(): string {
    return this._label;
  }

  getRecipientName(): string {
    return this._recipientName;
  }

  getPhoneNumber(): string {
    return this._phoneNumber.getValue();
  }

  getAddressLine1(): string {
    return this._addressLine1;
  }

  getAddressLine2(): string | undefined {
    return this._addressLine2;
  }

  getCity(): string {
    return this._city;
  }

  getRegion(): string {
    return this._region;
  }

  getCountry(): string {
    return this._country;
  }

  getPostalCode(): string {
    return this._postalCode;
  }

  getIsActive(): boolean {
    return this._isActive;
  }

  getIsDefault(): boolean {
    return this._isDefault;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }

  getDeletedAt(): Date | null {
    return this._deletedAt;
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
