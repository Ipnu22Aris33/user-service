import { AddressEntity } from '@domain/entities/address.entity';

export const ADDRESS_PORT = Symbol('ADDRESS_PORT');

export interface AddressPort {
  save(address: AddressEntity): Promise<AddressEntity>;
  findByUid(uid: string): Promise<AddressEntity | null>;
}
