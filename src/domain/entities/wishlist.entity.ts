import { BaseEntity, BaseEntityProps } from '@domain/base/base.entity';
import { UidVO } from '@domain/value-objects';

export interface WishlistEntityProps extends BaseEntityProps {
  userUid: UidVO;
  productUid: UidVO;
  notes: string;
}

export class WishListEntity extends BaseEntity<WishlistEntityProps> {
  private constructor(props: WishlistEntityProps) {
    super(props);
  }

  static create(){}
  static reconstruct(){}
}
