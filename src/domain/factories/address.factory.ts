import { BaseFactory } from '@domain/base/base.factory';
import {
  AddressEntity,
  AddressEntityProps,
} from '@domain/entities/address.entity';
import {
  ActivateStatusEnumType,
  ActivateStatusVO,
  AddressLineVO,
  LabelVO,
  PostalCodeVO,
  UidVO,
} from '@domain/value-objects';

export class AddressFactoryProps {
  userUid: UidVO;
  label: LabelVO;
  addressLine1: AddressLineVO;
  addressLine2: AddressLineVO | null;
  city: string;
  region: string;
  country: string;
  postalCode: PostalCodeVO;
  isDefault: boolean;
}

export class AddressFactory extends BaseFactory<{
  factoryProps: AddressFactoryProps;
  entityProps: AddressEntityProps;
  entity: AddressEntity;
}> {
  protected entityClass = AddressEntity;

  protected getDefaults(): Partial<AddressEntityProps> {
    return {
      status: ActivateStatusVO.create(ActivateStatusEnumType.ACTIVE),
    };
  }

  createNew(props: { props: AddressFactoryProps; actor?: UidVO }) {
    return this.create({
      props: props.props,
      actor: props.actor,
    });
  }
}
