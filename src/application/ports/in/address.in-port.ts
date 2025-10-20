import { CreateAddressDTO } from '@application/dtos/create-address.dto';
import { CreateAddressResult } from '@application/types/address-use-case.type';

export const ADDRESS_IN_PORT = Symbol('ADDRESS_IN_PORT');

export interface AddressInPort {
  createAddress(dto: CreateAddressDTO): Promise<CreateAddressResult>;
}
