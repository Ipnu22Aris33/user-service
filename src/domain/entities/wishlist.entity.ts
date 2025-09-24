import { UidVO } from "@domain/value-objects";

export interface WishlistEntityProps {
  uid: UidVO;
  userUid: UidVO;
  productUid: UidVO;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
