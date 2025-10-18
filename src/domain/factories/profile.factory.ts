import { BaseFactory } from '@domain/base/base.factory';
import {
  ProfileEntity,
  ProfileEntityProps,
} from '@domain/entities/profile.entity';
import {
  NameVO,
  PhoneNumberVO,
  UidVO,
  UserStatusEnumType,
  UserStatusVO,
} from '@domain/value-objects';
import {
  ProfileStatusEnumType,
  ProfileStatusVO,
} from '@domain/value-objects/profile-status.vo';

export interface ProfileFactoryProps {
  userUid: UidVO;
  fullName: NameVO;
  phoneNumber: PhoneNumberVO;
  avatarUrl?: string;
}

export class ProfileFactory extends BaseFactory<{
  factoryProps: ProfileFactoryProps;
  entityProps: ProfileEntityProps;
  entity: ProfileEntity;
}> {
  protected entityClass = ProfileEntity;

  protected getDefaults(): Partial<ProfileEntityProps> {
    return {
      profileStatus: ProfileStatusVO.create(ProfileStatusEnumType.UNVERIFIED),
    };
  }

  createNew(props: { props: ProfileFactoryProps; actor?: UidVO }) {
    return this.create({
      props: props.props,
      actor: props.actor,
    });
  }
}
