import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '@domain/entities/user.entity';

import { CreateUserUseCase } from '@application/usecases/create-user.usecase';
import { InputCreateUserDTO } from '@application/dtos/create-user.dto';
import { FindUserByUidUseCase } from '@application/usecases/find-by-uid.usecase';
import { UpdateUserStatusUseCase } from '@application/usecases/update-user-status.use-case';
import { StatusType } from '@domain/value-objects';

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByUidUseCase: FindUserByUidUseCase,
    private readonly updateUserStatusUseCase: UpdateUserStatusUseCase,
  ) {}

  async create(dto: {
    name: string;
    email: string;
    phoneNumber: string;
    status?: StatusType;
  }) {
    const data = await this.createUserUseCase.execute({
      ...dto,
      status: dto.status ?? StatusType.PENDING,
    });
    console.log(dto.status)
    return data;
  }

  async findUserByUid(uid: string) {
    const doc = await this.findUserByUidUseCase.execute(uid);
    if (!doc) throw new NotFoundException('kk');
    return doc;
  }

  async updateStatus({ uid, status }: { uid: string; status: StatusType }) {
    const doc = await this.updateUserStatusUseCase.execute({ uid, status });
    if (!doc) throw new NotFoundException('kk');
    return doc;
  }
}
