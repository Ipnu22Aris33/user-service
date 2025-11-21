import { AddressEntity } from '@core/domain/entities/address.entity';
import { AddressEntityProps } from '@core/domain/entities/address.entity';

export class AddressMapper {
  static toPersistence(entity: AddressEntity): AddressEntityProps {
    return entity.toObject();
  }

  static toPersistenceArray(entities: AddressEntity[]): AddressEntityProps[] {
    return entities.map((entity) => this.toPersistence(entity));
  }

  static toDomain(props: AddressEntityProps): AddressEntity {
    return AddressEntity.rehydrate(props);
  }

  static toDomainArray(props: AddressEntityProps[]): AddressEntity[] {
    return props.map((entity) => this.toDomain(entity));
  }
}
