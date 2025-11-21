import { ProfileEntity, ProfileEntityProps } from '@core/domain/entities/profile.entity';

export class ProfileMapper {
  static toPersistence(entity: ProfileEntity): ProfileEntityProps {
    return entity.toObject();
  }

  static toPersistenceArray(entities: ProfileEntity[]): ProfileEntityProps[] {
    return entities.map((entity) => this.toPersistence(entity));
  }

  static toDomain(props: ProfileEntityProps): ProfileEntity {
    return ProfileEntity.rehydrate(props);
  }

  static toDomainArray(props: ProfileEntityProps[]): ProfileEntity[] {
    return props.map((entity) => this.toDomain(entity));
  }
}
