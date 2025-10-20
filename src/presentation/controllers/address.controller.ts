// import { AddressService } from '@application/services/address.service';
// import type { CreateAddressUseCaseDTO } from '@application/usecases/address/create-address.usecase';
import { JwtAuthGuard } from '@infrastructure/security/jwt-auth.guard';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import type { UidParamRequestDTO } from '@presentation/dtos/request/uid-param.dto';
import { UidParamRequestSchema } from '@presentation/dtos/request/uid-param.dto';
import { AddressResponseMapper } from '@presentation/mappers/address-response.mapper';

@Controller('address')
export class AddressController {
  // constructor(private readonly addressService: AddressService) {}

  // @Post('create')
  // // @UseGuards(JwtAuthGuard)
  // async create(@Body() dto: CreateAddressUseCaseDTO) {
  //   return await this.addressService.createAddress(dto);
  // }
  // @Get(':uid')
  // async findAddressByUid(@Param() param: UidParamRequestDTO) {
  //   const { uid } = UidParamRequestSchema.parse(param);
  //   const address = await this.addressService.findAddressByUid(uid);
  //   return AddressResponseMapper.toResponse(address);
  // }
}
