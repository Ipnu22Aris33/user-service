export class CreateAddressDTO {
  userUid: string;
  label: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  region: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}
