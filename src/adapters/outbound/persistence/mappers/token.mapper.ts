import { TokenEntity, TokenProps } from '@core/domain/entities/token.entity';
import { TokenEntityProps } from '@core/domain/entities/token.entity';

export class TokenMapper {
  static toPersistence(entity: TokenEntity): TokenEntityProps {
    return entity.toObject();
  }

  static toPersistenceArray(entities: TokenEntity[]): TokenEntityProps[] {
    return entities.map((entity) => this.toPersistence(entity));
  }

  static toDomain(props: TokenEntityProps): TokenEntity {
    return TokenEntity.rehydrate(props);
  }

  static toDomainArray(props: TokenEntityProps[]): TokenEntity[] {
    return props.map((entity) => this.toDomain(entity));
  }
}
