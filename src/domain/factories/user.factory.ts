import { UserEntity, UserEntityProps } from '@domain/entities/user.entity';
import {
  UidVO,
  NameVO,
  EmailVO,
  PhoneNumberVO,
  StatusVO,
  StatusType,
} from '@domain/value-objects';

export class UserFactory {
  static create(props: {
    name: NameVO;
    phoneNumber: PhoneNumberVO;
    email: EmailVO;
    status: StatusVO
  }): UserEntity {
    const userProps: UserEntityProps = {
      ...props,
      uid: UidVO.create(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return new UserEntity(userProps);
  }
}
