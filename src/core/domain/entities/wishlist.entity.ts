import { BaseEntity, BaseEntityProps } from 'src/core/common/base/base.entity';

export interface WishlistProps {
  userUid: string;
  productUid: string;
  notes: string;
}

export type WishlistEntityProps = WishlistProps & BaseEntityProps;

export class WishListEntity extends BaseEntity<WishlistEntityProps> {
  private constructor(props: WishlistEntityProps) {
    super(props);
  }

  static build(props: WishlistProps & { actor?: string }): WishListEntity {
    const base = this.baseDefaults(props.actor);
    return new WishListEntity({ ...props, ...base });
  }

  getUserUid(): string {
    return this.props.userUid;
  }
  getProductUid(): string {
    return this.props.productUid;
  }
  getNotes(): string {
    return this.props.notes;
  }
}
