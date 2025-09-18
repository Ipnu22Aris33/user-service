import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from '@application/ports/user.repository.port';
import { UserFactory } from '@domain/factories/user.factory';
import {
  UidVO,
  NameVO,
  EmailVO,
  RoleVO,
  PasswordVO,
  PhoneNumberVO,
} from '@domain/value-objects';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepo: IUserRepository,
  ) {}

  async execute(data: {
    uid: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
  }) {
    const userEntity = UserFactory.signup({
      uid: UidVO.fromValue(data.uid),
      name: NameVO.create(data.name),
      email: EmailVO.fromValue(data.email),
      phoneNumber: PhoneNumberVO.fromValue(data.phoneNumber),
      role: RoleVO.fromValue(data.role),
    });
    console.log('ju', userEntity.uid);
    return this.userRepo.save(userEntity);
  }
}
