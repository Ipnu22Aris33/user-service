// base.factory.ts
import { BaseEntity, BaseEntityProps } from './base.entity';

export abstract class BaseFactory {
  /**
   * Reconstruct an entity from domain layer props
   * Usage: ProfileFactory.reconstruct(props)
   */
  static reconstruct(
    this: { build(props: any): any },
    props: any
  ): any {
    return this.build(props);
  }

  /**
   * Rehydrate an entity from persistence layer raw data
   * Usage: ProfileFactory.rehydrate(rawData)
   */
  static rehydrate(
    this: { build(props: any): any },
    raw: Record<string, unknown>
  ): any {
    const props = {
      ...raw,
      createdAt: raw.createdAt ? new Date(raw.createdAt as string) : null,
      updatedAt: raw.updatedAt ? new Date(raw.updatedAt as string) : null,
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt as string) : null,
    };

    return this.build(props);
  }
}
