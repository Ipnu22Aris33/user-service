export class BaseModel {
  uid: string;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
