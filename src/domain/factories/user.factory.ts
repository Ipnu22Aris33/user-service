import { UserEntity, UserEntityProps } from '@domain/entities/user.entity';
import {
  UidVO,
  NameVO,
  EmailVO,
  RoleVO,
  PhoneNumberVO,
} from '@domain/value-objects';

export class UserFactory {
  static signup(props: {
    uid: UidVO;
    name: NameVO;
    phoneNumber: PhoneNumberVO;
    email: EmailVO;
    role: RoleVO;
  }): UserEntity {
    const userProps: UserEntityProps = {
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return new UserEntity(userProps);
  }
}
