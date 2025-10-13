import { UserEntity } from '@domain/entities/user.entity';

export const USER_PORT = Symbol('USER_PORT')

export interface UserPort {
  save(user: UserEntity): Promise<UserEntity>;
  findByUid(uid: string): Promise<UserEntity | null>;
}
