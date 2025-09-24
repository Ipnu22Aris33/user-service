import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { IUserRepository } from '@application/ports/user.repository.port';
import { UserEntity } from '@domain/entities/user.entity';

@Injectable()
export class FindUserByUidUseCase {
  constructor(
    @Inject('UserRepository') private readonly repo: IUserRepository,
  ) {}

  async execute(uid: string): Promise<UserEntity | null> {
    return (await this.repo.findByUid(uid)) ?? null;
  }
}
