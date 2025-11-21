import { AddressEntity } from '@core/domain/entities/address.entity';

export type CreateAddressResult = {
  address: AddressEntity;
  message: string;
};
