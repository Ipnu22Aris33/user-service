import {
  UidVO,
  NameVO,
  EmailVO,
  RoleVO,
  PhoneNumberVO,
} from '@domain/value-objects';
import { UserEntity } from '@domain/entities/user.entity';
import { UserDocument } from '@infrastructure/databases/mongoose/schemas/user.schema';

export class UserMapper {
  static toEntity(user: UserDocument): UserEntity {
    if (!user) throw new Error('User document is null');
    return new UserEntity({
      uid: UidVO.fromValue(user.uid),
      name: NameVO.fromValue(user.name),
      email: EmailVO.fromValue(user.email),
      phoneNumber: PhoneNumberVO.fromValue(user.phoneNumber),
      role: RoleVO.fromValue(user.role),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  static toPersistence(user: UserEntity) {
    return {
      uid: user.uid,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
