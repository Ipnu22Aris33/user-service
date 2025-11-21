import { BaseEntity, BaseEntityProps } from 'src/core/common/base/base.entity';

export interface RoleProps {
  name: string;
  description: string | null;
  isDefault: boolean;
}

export interface RoleCreateProps {
  name: string;
  description: string | null;
  actor?: string;
} 

export type RoleEntityProps = RoleProps & BaseEntityProps;

export class RoleEntity extends BaseEntity<RoleEntityProps> {
  private constructor(props: RoleEntityProps) {
    super(props);
  }


  static create(props: RoleCreateProps): RoleEntity {
    const base = this.baseDefaults(props.actor);
    const defaults = {
      isDefault: false,
    };
    const created = {
      ...props,
      ...defaults,
      ...base,
    };
    return new RoleEntity(created);
  }

  update(props: Partial<RoleProps> & { actor?: string }): void {
    const { actor, name, description } = props;

    if (name !== undefined) this.changeName(name);
    if (description !== undefined) this.changeDescription(description);

    this.touch(actor);
  }

  setAsDefault(actor?: string): void {
    if (this.props.isDefault) return;
    this.props.isDefault = true;
    this.touch(actor);
  }

  unsetDefault(actor?: string): void {
    if (!this.props.isDefault) return;
    this.props.isDefault = false;
    this.touch(actor);
  }

  private changeName(newName: string): void {
    if (!newName) return;
    if (this.props.name === newName) return;
    this.props.name = newName;
  }
  private changeDescription(newDescription: string | null): void {
    if (newDescription === null) return;
    if (this.props.description === newDescription) return;
    this.props.description = newDescription;
  }

  getName(): string {
    return this.props.name;
  }
  getDescription(): string | null {
    return this.props.description;
  }
  getIsDefault(): boolean {
    return this.props.isDefault;
  }
}
