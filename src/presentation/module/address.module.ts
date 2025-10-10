import { AddressService } from '@application/services/address.service';
import { CreateAddressUseCase } from '@application/usecases/address/create-address.usecase';
import { FindAddressByUidUseCase } from '@application/usecases/address/find-address-by-uid.use-case';
import { DatabaseModule } from '@infrastructure/databases/database.module';
import { AddressRepository } from '@infrastructure/databases/repositories/address.repository';
import { Module } from '@nestjs/common';
import { AddressController } from '@presentation/controllers/address.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AddressController],
  providers: [
    {
      provide: 'AddressRepository',
      useClass: AddressRepository,
    },
    CreateAddressUseCase,
    AddressService,
    FindAddressByUidUseCase,
  ],
})
export class AddressModule {}
