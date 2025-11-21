import { BaseEntity, BaseEntityProps } from 'src/core/common/base/base.entity';
import { ActivateStatusEnum } from 'src/core/common/enums/activate-status.enum';

export interface AddressProps {
  userUid: string;
  label: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  region: string;
  country: string;
  postalCode: string;
  status: ActivateStatusEnum;
  isDefault: boolean;
}

export interface AddressCreateProps {
  userUid: string;
  label: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  region: string;
  country: string;
  postalCode: string;
  actor?: string;
}

export type AddressEntityProps = AddressProps & BaseEntityProps;

export class AddressEntity extends BaseEntity<AddressEntityProps> {
  private constructor(props: AddressEntityProps) {
    super(props);
  }

  static create(props: AddressCreateProps): AddressEntity {
    const base = this.baseDefaults(props.actor);
    const defaults = {
      status: ActivateStatusEnum.ACTIVE,
      isDefault: false,
    };
    const created = {
      ...props,
      ...defaults,
      ...base,
    };
    return new AddressEntity(created);
  }

  updateDetails(props: Partial<AddressEntityProps> & { actor?: string }): void {
    if (props.label !== undefined) this.changeLabel(props.label);
    if (props.addressLine1 !== undefined) this.changeAddressLine1(props.addressLine1);
    if (props.addressLine2 !== undefined) this.changeAddressLine2(props.addressLine2);
    if (props.city !== undefined) this.changeCity(props.city);
    if (props.region !== undefined) this.changeRegion(props.region);
    if (props.country !== undefined) this.changeCountry(props.country);
    if (props.postalCode !== undefined) this.changePostalCode(props.postalCode);

    this.touch(props.actor);
  }

  updateActivationStatus(status: ActivateStatusEnum, actor?: string): void {
    if (this.props.status === status) return;

    this.props.status = status;
    this.touch(actor);
  }

  setAsDefault(actor?: string): void {
    if (this.props.isDefault) return;
    this.props.isDefault = true;
    this.touch(actor);
  }

  unsetDefault(actor?: string): void {
    if (!this.props.isDefault) return;
    this.props.isDefault = false;
    this.touch(actor);
  }

  private changeLabel(newLabel: string): void {
    if (!newLabel) return;
    if (this.props.label === newLabel) return;
    this.props.label = newLabel;
  }
  private changeAddressLine1(newAddressLine1: string): void {
    if (!newAddressLine1) return;
    if (this.props.addressLine1 === newAddressLine1) return;
    this.props.addressLine1 = newAddressLine1;
  }
  private changeAddressLine2(newAddressLine2: string | null): void {
    if (newAddressLine2 === null) return;
    if (this.props.addressLine2 === newAddressLine2) return;
    this.props.addressLine2 = newAddressLine2;
  }
  private changeCity(newCity: string): void {
    if (!newCity) return;
    if (this.props.city === newCity) return;
    this.props.city = newCity;
  }
  private changeRegion(newRegion: string): void {
    if (!newRegion) return;
    if (this.props.region === newRegion) return;
    this.props.region = newRegion;
  }
  private changeCountry(newCountry: string): void {
    if (!newCountry) return;
    if (this.props.country === newCountry) return;
    this.props.country = newCountry;
  }
  private changePostalCode(newPostalCode: string): void {
    if (!newPostalCode) return;
    if (this.props.postalCode === newPostalCode) return;
    this.props.postalCode = newPostalCode;
  }
}
