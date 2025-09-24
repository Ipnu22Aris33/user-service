import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from '@application/ports/user.repository.port';
import { UserFactory } from '@domain/factories/user.factory';
import {
  NameVO,
  EmailVO,
  PhoneNumberVO,
  StatusVO,
  StatusType,
} from '@domain/value-objects';
import { InputCreateUserDTO } from '@application/dtos/create-user.dto';
import { UserEntity } from '@domain/entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly repo: IUserRepository,
  ) {}

  async execute(data: InputCreateUserDTO): Promise<UserEntity> {
    const userEntity = UserFactory.create({
      name: NameVO.create(data.name),
      email: EmailVO.create(data.email),
      phoneNumber: PhoneNumberVO.create(data.phoneNumber),
      status: StatusVO.create(data.status),
    });
    return this.repo.save(userEntity);
  }
}
