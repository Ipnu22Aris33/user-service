import {
  CreateAddressUseCase,
  CreateAddressUseCaseDTO,
} from '@application/usecases/address/create-address.usecase';
import { FindAddressByUidUseCase } from '@application/usecases/address/find-address-by-uid.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddressService {
  constructor(
    private readonly createAddressUseCase: CreateAddressUseCase,
    private readonly findAddressByUidUseCase: FindAddressByUidUseCase,
  ) {}

  async createAddress(address: CreateAddressUseCaseDTO) {
    return await this.createAddressUseCase.execute(address);
  }

  async findAddressByUid(uid: string) {
    return await this.findAddressByUidUseCase.execute(uid);
  }
}
