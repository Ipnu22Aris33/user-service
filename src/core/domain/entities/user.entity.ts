import { BaseEntity, BaseEntityProps } from '@helper/base/base.entity';
import { UserStatusEnum } from '@domain/enums/user-status.enum';

export interface UserProps {
  email: string;
  passwordHash: string;
  roleUid: string | null;
  userStatus: UserStatusEnum;
  lastSignInAt: Date | null;
  lastSignOutAt: Date | null;
  lastPasswordChangeAt: Date | null;
}

export interface UserCreateProps {
  email: string;
  passwordHash: string;
  actor?: string;
}

export type UserEntityProps = UserProps & BaseEntityProps;

export class UserEntity extends BaseEntity<UserEntityProps> {
  protected constructor(props: UserEntityProps) {
    super(props);
  }


  static create(props: UserCreateProps): UserEntity {
    const base = this.baseDefaults(props.actor);
    const defaults = {
      roleUid: null,
      userStatus: UserStatusEnum.PENDING,
      lastPasswordChangeAt: null,
      lastSignInAt: null,
      lastSignOutAt: null,
      lastLoginIp: null,
    };

    const created = {
      ...props,
      ...defaults,
      ...base,
    };

    return new UserEntity(created);
  }

  signIn(actor?: string): void {
    this.props.lastSignInAt = new Date();
    this.touch(actor);
  }

  signOut(actor: string): void {
    this.props.lastSignOutAt = new Date();
    this.touch(actor);
  }

  updateEmail(newEmail: string, actor: string): void {
    if (this.props.email === newEmail) return;
    this.props.email = newEmail;
    this.touch(actor);
  }

  updatePasswordHash(newPasswordHash: string, actor: string): void {
    if (this.props.passwordHash === newPasswordHash) return;
    this.props.passwordHash = newPasswordHash;
    this.touch(actor);
  }

  updateStatus(newStatus: UserStatusEnum, actor: string): void {
    if (this.props.userStatus === newStatus) return;
    this.props.userStatus = newStatus;
    this.touch(actor);
  }

  getEmail(): string {
    return this.props.email;
  }
  getPasswordHash(): string {
    return this.props.passwordHash;
  }
  getRoleUid(): string | null {
    return this.props.roleUid;
  }
  getUserStatus(): UserStatusEnum {
    return this.props.userStatus;
  }
  getLastSignInAt(): Date | null {
    return this.props.lastSignInAt;
  }
  getLastSignOutAt(): Date | null {
    return this.props.lastSignOutAt;
  }
  getLastPasswordChangeAt(): Date | null {
    return this.props.lastPasswordChangeAt;
  }
}
