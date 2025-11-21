import { BaseEntity, BaseEntityProps } from 'src/core/common/base/base.entity';
import { ProfileStatusEnum } from 'src/core/common/enums/profile-status.enum';

export interface ProfileProps {
  userUid: string;
  fullName: string;
  phoneNumber: string;
  avatarUrl: string | null;
  profileStatus: ProfileStatusEnum;
}

export interface ProfileCreateProps {
  userUid: string;
  fullName: string;
  phoneNumber: string;
  avatarUrl?: string | null;
  actor?: string;
}

export type ProfileEntityProps = ProfileProps & BaseEntityProps;

export class ProfileEntity extends BaseEntity<ProfileEntityProps> {
  private constructor(props: ProfileEntityProps) {
    super(props);
  }

  static create(props: ProfileCreateProps): ProfileEntity {
    const base = this.baseDefaults(props.actor);
    const defaults = {
      profileStatus: ProfileStatusEnum.ACTIVE,
      avatarUrl: null,
    };
    const created = {
      ...props,
      ...defaults,
      ...base,
    };
    return new ProfileEntity(created);
  }

  updateDetails(props: Partial<ProfileProps> & { actor?: string }): void {
    const { actor, fullName, phoneNumber, avatarUrl, profileStatus } = props;

    if (fullName !== undefined) this.changeFullName(fullName);
    if (phoneNumber !== undefined) this.changePhoneNumber(phoneNumber);
    if (avatarUrl !== undefined) this.changeAvatarUrl(avatarUrl);
    if (profileStatus !== undefined) this.changeProfileStatus(profileStatus);

    this.touch(actor);
  }

  private changeFullName(newFullName: string): void {
    if (!newFullName) return;
    if (this.props.fullName === newFullName) return;
    this.props.fullName = newFullName;
  }
  private changePhoneNumber(newPhoneNumber: string): void {
    if (!newPhoneNumber) return;
    if (this.props.phoneNumber === newPhoneNumber) return;
    this.props.phoneNumber = newPhoneNumber;
  }
  private changeProfileStatus(newProfileStatus: ProfileStatusEnum): void {
    if (this.props.profileStatus === newProfileStatus) return;
    this.props.profileStatus = newProfileStatus;
  }
  private changeAvatarUrl(newAvatarUrl: string | null): void {
    if (newAvatarUrl === null) return;
    if (this.props.avatarUrl === newAvatarUrl) return;
    this.props.avatarUrl = newAvatarUrl;
  }
}
