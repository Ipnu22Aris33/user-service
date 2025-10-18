import { Controller, Body, Post, Get, Param, Query, Put, UseGuards } from '@nestjs/common';
import { UserResponseMapper } from '@presentation/mappers/user-response.mapper';
import {
  CreateUserRequestSchema,
  type CreateUserRequestDTO,
} from '@presentation/dtos/request/create-user.dto';
import {
  UidParamRequestSchema,
  type UidParamRequestDTO,
} from '@presentation/dtos/request/uid-param.dto';
import {
  type UpdateUserStatusRequestDTO,
  UpdateUserStatusRequestSchema,
} from '@presentation/dtos/request/update-user-status.dto';
import { JwtAuthGuard } from '@infrastructure/security/jwt-auth.guard';
import { Roles } from '@infrastructure/security/role.decorator';

@Controller('users')
export class UserController {
  // constructor(private readonly userService: UserService) {}

  // @Post('create')
  // // @UseGuards(JwtAuthGuard)
  // // @Roles('admin')
  // async create(@Body() body: CreateUserRequestDTO) {
  //   const parsed = CreateUserRequestSchema.parse(body);
  //   const user = await this.userService.create(parsed);
  //   return UserResponseMapper.toCreateUser(user);
  // }

  // @Get(':uid')
  // async findUserByUid(@Param() param: UidParamRequestDTO) {
  //   const { uid } = UidParamRequestSchema.parse(param);
  //   const user = await this.userService.findUserByUid(uid);
  //   return UserResponseMapper.toGetByUid(user);
  // }

  // @Put(':uid/status')
  // async updateStatusUser(
  //   @Param() param: UidParamRequestDTO,
  //   @Body() body: UpdateUserStatusRequestDTO,
  // ) {
  //   const { uid } = UidParamRequestSchema.parse(param);
  //   const { status } = UpdateUserStatusRequestSchema.parse(body);
  //   const doc = await this.userService.updateStatus({ uid, status });
  //   return UserResponseMapper.toGetByUid(doc);
  // }
}
