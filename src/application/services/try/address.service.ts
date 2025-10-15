import {
  ADDRESS_PORT,
  type AddressPort,
} from '@application/ports/address.port';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AddressService {
  constructor(
    @Inject(ADDRESS_PORT) private readonly addressPort: AddressPort,
  ) {}

  async createAddress(){}

  

  async findAddressByUid(){}

  async findAddressByUserUid(){}
}
