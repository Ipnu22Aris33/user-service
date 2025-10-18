import { UidVO } from '@domain/value-objects';

export interface BaseEntityProps {
  uid: UidVO;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  createdBy?: UidVO | null;
  updatedBy?: UidVO | null;
  deletedBy?: UidVO | null;
}

export abstract class BaseEntity<TProps extends BaseEntityProps> {
  protected props: TProps;

  constructor(props: TProps) {
    this.props = props;
  }

  // ---------- MUTATORS ----------

  protected touch(actor?: UidVO) {
    this.props.updatedAt = new Date();
    if (actor) this.props.updatedBy = actor;
  }

  softDelete(actor?: UidVO) {
    this.props.deletedAt = new Date();
    if (actor) this.props.deletedBy = actor;
    this.touch(actor);
  }

  restore(actor?: UidVO) {
    this.props.deletedAt = null;
    this.props.deletedBy = null;
    this.touch(actor);
  }

  // ---------- GETTERS ----------

  getProps(): TProps {
    return this.props;
  }

  getUid(): string {
    return this.props.uid.getValue();
  }

  getCreatedBy(): string | null {
    return this.props.createdBy?.getValue() || null;
  }

  getUpdatedBy(): string | null {
    return this.props.updatedBy?.getValue() || null;
  }

  getDeletedBy(): string | null {
    return this.props.deletedBy?.getValue() || null;
  }

  getCreatedAt(): Date {
    return this.props.createdAt;
  }

  getUpdatedAt(): Date {
    return this.props.updatedAt;
  }

  getDeletedAt(): Date | null | undefined {
    return this.props.deletedAt;
  }
}
