import { AddressEntity } from '@domain/entities/address.entity';
import {
  NameVO,
  PhoneNumberVO,
  UidVO,
  AddressLineVO,
  LabelVO,
  PostalCodeVO,
} from '@domain/value-objects';
import { AddressDocument } from '@infrastructure/databases/schemas/address.schema';

export class AddressMapper {
  static fromPersistence(address: AddressDocument): AddressEntity {
    return new AddressEntity({
      uid: UidVO.fromValue(address.uid),
      userUid: UidVO.fromValue(address.userUid),
      label: LabelVO.create(address.label),
      recipientName: NameVO.fromValue(address.recipientName),
      phoneNumber: PhoneNumberVO.fromValue(address.phoneNumber),
      addressLine1: AddressLineVO.fromValue(address.addressLine1),
      addressLine2: AddressLineVO.fromOptionalValue(address.addressLine2),
      city: address.city,
      region: address.region,
      country: address.country,
      postalCode: PostalCodeVO.create(address.postalCode) ,
      isActive: address.isActive,
      isDefault: address.isDefault,
      createdAt: address.createdAt,
      updatedAt: address.updatedAt,
      deletedAt: address.deletedAt,
    });
  }

  static toPersistence(address: AddressEntity) {
    return address.toObject();
  }
}
