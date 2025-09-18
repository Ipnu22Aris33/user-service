export interface AddressEntityProps {
  uid: string;
  userUid: string;
  label: string;
  recipientName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region: string;
  country: string;
  postalCode: string;
  isActive: boolean;
  isDefault: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
