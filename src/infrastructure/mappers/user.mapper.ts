import {
  UidVO,
  NameVO,
  EmailVO,
  PhoneNumberVO,
  StatusVO,
} from '@domain/value-objects';
import { UserEntity } from '@domain/entities/user.entity';
import { UserDocument } from '@infrastructure/databases/schemas/user.schema';

export class UserMapper {
  static fromPersistence(user: UserDocument): UserEntity {
    const uid = UidVO.fromValue(user.uid);
    const name = NameVO.fromValue(user.name);
    const email = EmailVO.fromValue(user.email);
    const status = StatusVO.fromValue(user.status);
    const phoneNumber = PhoneNumberVO.fromValue(user.phoneNumber);
    const props = { uid, name, email, status, phoneNumber };
    const { createdAt, updatedAt } = user;

    return new UserEntity({ ...props, createdAt, updatedAt });
  }

  static toPersistence(user: UserEntity) {
    return user.toObject();
  }
}
