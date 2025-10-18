import { UserStatusEnumType } from '@domain/value-objects';

export class CreateUserServiceDTO {
  name: string;
  email: string;
  phoneNumber: string;
  status: UserStatusEnumType;
}
