import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { UserPort } from '@application/ports/user.port';
import { UserEntity } from '@domain/entities/user.entity';

@Injectable()
export class FindUserByUidUseCase {
  constructor(
    @Inject('UserPort') private readonly repo: UserPort,
  ) {}

  async execute(uid: string): Promise<UserEntity | null> {
    return (await this.repo.findByUid(uid)) ?? null;
  }
}
