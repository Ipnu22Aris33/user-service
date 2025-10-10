import { UserEntity } from '@domain/entities/user.entity';

export interface UserPort {
  save(user: UserEntity): Promise<UserEntity>;
  findByUid(uid: string): Promise<UserEntity | null>;
}
