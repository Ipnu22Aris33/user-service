import { AddressEntity } from '@domain/entities/address.entity';

export type CreateAddressResult = {
  address: AddressEntity;
  message: string;
};
