import { UserEntity } from '@domain/entities/user.entity';

export interface IUserRepository {
  save(user: UserEntity): Promise<UserEntity>;
  findByUid(uid: string): Promise<UserEntity | null>;
}
