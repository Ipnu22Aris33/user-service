import { AddressEntity } from "@domain/entities/address.entity";

export class AddressResponseMapper {
  static toResponse(address: AddressEntity) {
    return {
      uid: address.getUid(),
      userUid: address.getUserUid(),
      label: address.getLabel(),
      recipientName: address.getRecipientName(),
      phoneNumber: address.getPhoneNumber(),
      addressLine1: address.getAddressLine1(),
      addressLine2: address.getAddressLine2() ?? null,
      city: address.getCity(),
      region: address.getRegion(),
      country: address.getCountry(),
      postalCode: address.getPostalCode(),
      isActive: address.getIsActive(),
      isDefault: address.getIsDefault(),
      createdAt: address.getCreatedAt(),
      updatedAt: address.getUpdatedAt(),
      deletedAt: address.getDeletedAt(),
    };
  }

  // Optional: mapper untuk list
  static toResponses(addresses: AddressEntity[]) {
    return addresses.map((a) => this.toResponse(a));
  }
}
