import { ProfileEntity } from "@domain/entities/profile.entity";
import { UserEntity } from "@domain/entities/user.entity";

export interface SignInOutputType {
  user: UserEntity;
  accessToken: string;
  refreshToken: string;
}

export interface SignInInputType {
  email: string;
  password: string;
}

export interface SignUpInputType {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  roleUid: string;
}

export interface SignUpOutputType {
  user: UserEntity;
  profile: ProfileEntity;
}