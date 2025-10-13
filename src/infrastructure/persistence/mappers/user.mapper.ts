import {
  UidVO,
  NameVO,
  EmailVO,
  PhoneNumberVO,
  StatusVO,
} from '@domain/value-objects';
import { UserEntity } from '@domain/entities/user.entity';
import { UserDocument } from '@infrastructure/persistence/databases/mongoose/schemas/user.schema';

export class UserMapper {
  static fromPersistence(user: UserDocument): UserEntity {
    return new UserEntity({
      uid: UidVO.fromValue(user.uid),
      name: NameVO.fromValue(user.name),
      email: EmailVO.fromValue(user.email),
      status: StatusVO.fromValue(user.status),
      phoneNumber: PhoneNumberVO.fromValue(user.phoneNumber),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  static toPersistence(user: UserEntity) {
    return user.toObject();
  }
}
