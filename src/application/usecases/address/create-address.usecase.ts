import type { IAddressRepository } from '@application/ports/address.repository.port';
import { AddressEntity } from '@domain/entities/address.entity';
import { AddressFactory } from '@domain/factories/address.factory';
import {
  UidVO,
  NameVO,
  PhoneNumberVO,
  AddressLineVO,
  LabelVO,
  PostalCodeVO,
} from '@domain/value-objects';
import { Inject, Injectable } from '@nestjs/common';

export type CreateAddressUseCaseDTO = {
  userUid: string;
  label: string;
  recipientName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  region: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
};

@Injectable()
export class CreateAddressUseCase {
  constructor(
    @Inject('AddressRepository') private readonly repo: IAddressRepository,
  ) {}

  async execute(dto: CreateAddressUseCaseDTO): Promise<AddressEntity> {
    return this.repo.save(
      AddressFactory.create({
        userUid: UidVO.fromValue(dto.userUid),
        label: LabelVO.create(dto.label),
        recipientName: NameVO.create(dto.recipientName),
        phoneNumber: PhoneNumberVO.create(dto.phoneNumber),
        addressLine1: AddressLineVO.create(dto.addressLine1),
        addressLine2: AddressLineVO.createOptional(dto.addressLine2),
        city: dto.city,
        region: dto.region,
        country: dto.country,
        postalCode: PostalCodeVO.create(dto.postalCode),
        isDefault: dto.isDefault,
      }),
    );
  }
}
