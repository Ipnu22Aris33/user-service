import { Injectable, Inject } from '@nestjs/common';
import type { IUserRepository } from '@application/ports/user.repository.port';
import { StatusType, StatusVO } from '@domain/value-objects';
import { UserEntity } from '@domain/entities/user.entity';

@Injectable()
export class UpdateUserStatusUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepo: IUserRepository,
  ) {}

  async execute({
    uid,
    status,
  }: {
    uid: string;
    status: StatusType;
  }): Promise<UserEntity | null> {
    const user = await this.userRepo.findByUid(uid);
    if (!user) return null;
    const statusVO = StatusVO.create(status);
    user.changeStatus(statusVO);
    return await this.userRepo.save(user);
  }
}
