import { SignInInputType, SignUpInputType, SignUpOutputType, SignInOutputType } from '@application/types/user-use-case.type';
import { UserEntity } from '@domain/entities/user.entity';

export const USER_OUT_PORT = Symbol('USER_OUT_PORT');
export const USER_IN_PORT = Symbol('USER_IN_PORT');

export interface UserOutPort {
  save(userEntity: UserEntity): Promise<UserEntity>;
  findByUid(uid: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
}

export interface UserInPort {
  signIn(props: SignInInputType): Promise<SignInOutputType>;
  signUp(props: SignUpInputType): Promise<SignUpOutputType>;
  // signOut(uid: string): Promise<UserEntity>;
}
