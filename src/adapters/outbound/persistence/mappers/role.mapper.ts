import { RoleEntity } from '@core/domain/entities/role.entity';

import { RoleEntityProps } from '@core/domain/entities/role.entity';

export class RoleMapper {
  static toPersistence(entity: RoleEntity): RoleEntityProps {
    return entity.toObject();
  }

  static toPersistenceArray(entities: RoleEntity[]): RoleEntityProps[] {
    return entities.map((entity) => this.toPersistence(entity));
  }

  static toDomain(props: RoleEntityProps): RoleEntity {
    return RoleEntity.rehydrate(props);
  }

  static toDomainArray(props: RoleEntityProps[]): RoleEntity[] {
    return props.map((entity) => this.toDomain(entity));
  }
}
