import type { IAddressRepository } from '@application/ports/address.repository.port';
import { AddressEntity } from '@domain/entities/address.entity';
import {
  Address,
  AddressDocument,
} from '@infrastructure/databases/schemas/address.schema';
import { AddressMapper } from '@infrastructure/mappers/address.mapper';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AddressRepository implements IAddressRepository {
  constructor(
    @InjectModel(Address.name)
    private readonly addressModel: Model<AddressDocument>,
  ) {}

  async save(address: AddressEntity): Promise<AddressEntity> {
    const persistence = AddressMapper.toPersistence(address);
    const filter = { uid: persistence.uid };
    const options = { new: true, upsert: true };

    return this.addressModel
      .findOneAndUpdate(filter, persistence, options)
      .then((doc) => {
        if (doc) return AddressMapper.fromPersistence(doc);
        throw new Error('Failed to upsert address');
      });
  }

  async findByUid(uid: string): Promise<AddressEntity | null> {
    const doc = await this.addressModel.findOne({ uid }).exec();
    return doc ? AddressMapper.fromPersistence(doc) : null;
  }
}
