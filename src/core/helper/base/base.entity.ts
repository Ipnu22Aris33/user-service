import { v4 as uuidv4 } from 'uuid';

/**
 * Core properties shared by all entities.
 */
export interface BaseEntityProps {
  uid: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  deletedBy?: string | null;
}

/**
 * Combine custom props with base entity props
 */
export type WithBaseProps<T> = T & BaseEntityProps;

/**
 * Abstract base class for all domain entities
 */
export abstract class BaseEntity<T extends BaseEntityProps> {
  // -----------------------------------------------------------
  // PROPERTIES
  // -----------------------------------------------------------
  protected props: T;

  // -----------------------------------------------------------
  // CONSTRUCTOR
  // -----------------------------------------------------------
  protected constructor(props: T) {
    this.props = props;
  }

  // -----------------------------------------------------------
  // STATIC HELPERS
  // -----------------------------------------------------------
  static baseDefaults(actor?: string): BaseEntityProps {
    const now = new Date();
    return {
      uid: uuidv4(),
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      createdBy: actor || null,
      updatedBy: actor || null,
      deletedBy: null,
    };
  }

  static rehydrate<T extends BaseEntityProps, TEntity extends BaseEntity<T>>(props: T): TEntity {
    return Reflect.construct(this, [props]) as TEntity;
  }

  // -----------------------------------------------------------
  // LIFECYCLE / STATUS HELPERS
  // -----------------------------------------------------------
  protected touch(actor?: string): void {
    this.props.updatedAt = new Date();
    this.props.updatedBy = actor || null;
  }

  softDelete(actor?: string): void {
    this.props.deletedAt = new Date();
    this.props.deletedBy = actor || null;
    this.touch(actor);
  }

  restore(actor?: string): void {
    this.props.deletedAt = null;
    this.props.deletedBy = null;
    this.touch(actor);
  }

  isSoftDeleted(): boolean {
    return this.props.deletedAt !== null;
  }

  isNew(): boolean {
    return Date.now() - this.props.createdAt.getTime() < 1000;
  }

  // -----------------------------------------------------------
  // UPDATE / CLONE HELPERS
  // -----------------------------------------------------------
  protected update(props: Partial<T>, actor?: string): void {
    Object.assign(this.props, props);
    this.touch(actor);
  }

  protected set<K extends keyof WithBaseProps<T>>(key: K, value: WithBaseProps<T>[K], actor?: string): void {
    this.props[key] = value;
    this.touch(actor);
  }

  clone(): this {
    const constructor = this.constructor as new (props: WithBaseProps<T>) => this;
    return new constructor({ ...this.props });
  }

  // -----------------------------------------------------------
  // EQUALITY CHECK
  // -----------------------------------------------------------
  equals(other?: BaseEntity<T>): boolean {
    if (!other) return false;
    if (this === other) return true;

    return this.deepEqual(this.props, other.props);
  }

  private deepEqual(a: any, b: any): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;

    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((v, i) => this.deepEqual(v, b[i]));
    }
    if (typeof a === 'object' && typeof b === 'object') {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;
      return keysA.every((key) => this.deepEqual(a[key], b[key]));
    }
    return a === b;
  }

  // -----------------------------------------------------------
  // GETTERS / SERIALIZATION
  // -----------------------------------------------------------
  getProps(): WithBaseProps<T> {
    return this.props;
  }

  get<K extends keyof WithBaseProps<T>>(key: K): WithBaseProps<T>[K] {
    return this.props[key];
  }

  toObject(): WithBaseProps<T> {
    return { ...this.props };
  }

  toJSON(): Record<string, any> {
    return this.toObject();
  }
}
