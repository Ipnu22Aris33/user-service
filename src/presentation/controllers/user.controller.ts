// import { Controller, Body, Post } from "@nestjs/common";
// import { UserService } from "@application/services/user.service";
// import { UserEntity } from "@domain/entities/user.entity";
// import type { CreateUserRequestDTO } from "@presentation/dtos/request/user/create.dto";
// import { UserResponseMapper } from "@presentation/mappers/user-response.mapper";

// @Controller('users')
// export class UserController{
//   constructor(private readonly userService:UserService){}

//   @Post('create')
//   async create(@Body() dto:CreateUserRequestDTO){
//     const create = await this.userService.create(dto)
//     return UserResponseMapper.toCreateUser(create)
//   }
// }
