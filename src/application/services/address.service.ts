import {
  ADDRESS_OUT_PORT,
  type AddressOutPort,
} from '@application/ports/out/address.port';
import { AddressEntity } from '@domain/entities/address.entity';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AddressService {
  constructor(
    @Inject(ADDRESS_OUT_PORT)
    private readonly port: AddressOutPort,
  ) {}

  async save(address: AddressEntity): Promise<void> {
    await this.port.save(address);
  }

  async findByUid(uid: string): Promise<AddressEntity | null> {
    return await this.port.findByUid(uid);
  }

  async findByUserUid(uid: string): Promise<AddressEntity[]> {
    return await this.findByUserUid(uid);
  }
}
