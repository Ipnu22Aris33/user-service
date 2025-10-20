import { Injectable } from '@nestjs/common';
import { CreateAddressDTO } from '@application/dtos/create-address.dto';
import { AddressInPort } from '@application/ports/in/address.in-port';
import { AddressService } from '@application/services/address.service';
import { CreateAddressResult } from '@application/types/address-use-case.type';
import { AddressFactory } from '@domain/factories/address.factory';
import {
  AddressLineVO,
  LabelVO,
  PostalCodeVO,
  UidVO,
} from '@domain/value-objects';

@Injectable()
export class AddressUseCase implements AddressInPort {
  constructor(private readonly addressService: AddressService) {}

  async createAddress(dto: CreateAddressDTO): Promise<CreateAddressResult> {
    const existingAddresses = await this.addressService.findByUserUid(
      dto.userUid,
    );
    const isDefault = existingAddresses.length === 0 || dto.isDefault;

    if (isDefault && existingAddresses.length > 0) {
      const addressesToUpdate = existingAddresses
        .filter((addr) => addr.getIsDefault())
        .map((addr) => (addr.deActivate(), addr));

      if (addressesToUpdate.length > 0) {
        await this.addressService.bulkSave(addressesToUpdate);
      }
    }

    const addressProps = {
      userUid: UidVO.create(dto.userUid),
      label: LabelVO.create(dto.label),
      addressLine1: AddressLineVO.create(dto.addressLine1),
      addressLine2: AddressLineVO.createOptional(dto.addressLine2),
      city: dto.city,
      region: dto.region,
      country: dto.country,
      postalCode: PostalCodeVO.create(dto.postalCode),
      isDefault,
    };

    const newAddress = new AddressFactory().createNew({ props: addressProps });
    await this.addressService.save(newAddress);

    return {
      address: newAddress,
      message: 'Address created successfully',
    };
  }
}
