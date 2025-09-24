import { CreateUserResponseDTO } from '@presentation/dtos/response/create-user.dto';
import { UserEntity } from '@domain/entities/user.entity';

export class UserResponseMapper {
  static toCreateUser(user: UserEntity): CreateUserResponseDTO {
    return {
      ...this.base(user),
      createdAt: user.getCreatedAt(),
    };
  }

  static toGetByUid(user: UserEntity) {
    return {
      ...this.base(user),
      status: user.getStatus(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    };
  }

  private static base(user: UserEntity) {
    return {
      uid: user.getUid(),
      name: user.getName(),
      email: user.getEmail(),
      phoneNumber: user.getPhoneNumber(),
    };
  }
}
