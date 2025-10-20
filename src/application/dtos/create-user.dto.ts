import { StatusEnumType } from '@domain/value-objects';

export class InputCreateUserDTO {
  name: string;
  email: string;
  phoneNumber: string;
  status: StatusEnumType;
}
