import { AddressEntity } from '@domain/entities/address.entity';

export const ADDRESS_OUT_PORT = Symbol('ADDRESS_OUT_PORT');

export interface AddressOutPort {
  save(address: AddressEntity): Promise<void>;
  bulkSave(address: AddressEntity[]): Promise<void>;
  findByUid(uid: string): Promise<AddressEntity | null>;
  findByUserUid(userUid: string): Promise<AddressEntity[]>;
}
