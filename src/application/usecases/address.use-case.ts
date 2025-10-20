import { CreateAddressDTO } from '@application/dtos/create-address.dto';
import { AddressInPort } from '@application/ports/in/address.in-port';
import { AddressService } from '@application/services/address.service';
import { ProfileService } from '@application/services/profile.service';
import { CreateAddressResult } from '@application/types/address-use-case.type';
import { AddressFactory } from '@domain/factories/address.factory';
import {
  AddressLineVO,
  LabelVO,
  PostalCodeVO,
  UidVO,
} from '@domain/value-objects';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddressUseCase implements AddressInPort {
  constructor(
    private readonly addressService: AddressService,
    private readonly profileService: ProfileService,
  ) {}

  async createAddress(dto: CreateAddressDTO): Promise<CreateAddressResult> {
    const address = await this.addressService.findByUserUid(dto.userUid);

    if (dto.isDefault) {
      for (const addr of address) {
        if (addr.getIsDefault()) {
          addr.deActivate();
          await this.addressService.save(addr);
        }
      }
    }

    const saved = new AddressFactory().createNew({
      props: {
        userUid: UidVO.create(dto.userUid),
        label: LabelVO.create(dto.label),
        addressLine1: AddressLineVO.create(dto.addressLine1),
        addressLine2: AddressLineVO.createOptional(dto.addressLine2),
        city: dto.city,
        region: dto.region,
        country: dto.country,
        postalCode: PostalCodeVO.create(dto.postalCode),
        isDefault: dto.isDefault,
      },
    });

    await this.addressService.save(saved);
    const result = {
      address: saved,
      message: '',
    };
    return result;
  }
}
