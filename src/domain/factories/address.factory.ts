import {
  AddressEntity,
  AddressEntityProps,
} from '@domain/entities/address.entity';

import {
  NameVO,
  PhoneNumberVO,
  UidVO,
  AddressLineVO,
  LabelVO,
  PostalCodeVO,
} from '@domain/value-objects';

export class AddressFactory {
  static create(props: {
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
    isDefault: boolean;
  }) {
    const addressProps: AddressEntityProps = {
      ...props,
      uid: UidVO.generate(),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    return new AddressEntity(addressProps);
  }
}
