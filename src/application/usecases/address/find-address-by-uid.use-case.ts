import { Inject, Injectable } from '@nestjs/common';
import { AddressRepository } from '@infrastructure/persistence/databases/mongoose/repositories/address.repository';
import { AddressEntity } from '@domain/entities/address.entity';

@Injectable()
export class FindAddressByUidUseCase {
  constructor(@Inject('AddressRepository') private readonly addressRepository: AddressRepository) {}

  async execute(uid: string): Promise<AddressEntity> {
    const doc = await this.addressRepository.findByUid(uid);
    if (!doc) {
      throw new Error('Address not found');
    }
    return doc;
  }
}
