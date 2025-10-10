import { AddressEntity } from '@domain/entities/address.entity';

export interface IAddressRepository {
  save(address: AddressEntity): Promise<AddressEntity>;
  findByUid(uid: string): Promise<AddressEntity | null>;
}
