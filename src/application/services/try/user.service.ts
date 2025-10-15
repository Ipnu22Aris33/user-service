import { USER_PORT, type UserPort } from '@application/ports/user.port';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(@Inject(USER_PORT) private readonly userPort: UserPort) {}

  async createUser(){}

  async findUserByUid(){}

  async findAllUser(){}
}
