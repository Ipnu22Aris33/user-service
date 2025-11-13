import { UserEntity, UserEntityProps } from '@domain/entities/user.entity';


export class UserMapper {
  static toPersistence(entity: UserEntity): UserEntityProps {
    return entity.toObject();
  }

  static toPersistenceArray(entities: UserEntity[]): UserEntityProps[] {
    return entities.map((entity) => this.toPersistence(entity));
  }

  static toDomain(props: UserEntityProps): UserEntity {
    console.log(props, 'toDomain');
    return UserEntity.rehydrate(props);
  }

  static toDomainArray(props: UserEntityProps[]): UserEntity[] {
    return props.map((entity) => this.toDomain(entity));
  }
}
