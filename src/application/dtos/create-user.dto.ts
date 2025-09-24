import { StatusType } from "@domain/value-objects";

export type InputCreateUserDTO = {
  name: string;
  email: string;
  phoneNumber: string;
  status: StatusType
};
