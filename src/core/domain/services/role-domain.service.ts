import { RoleEntity } from '@domain/entities/role.entity';
import { UnprocessableEntityException } from '@nestjs/common';

export class RoleDomainService {
  private static ensureSingleDefault(roles: RoleEntity[]): void {
    const defaultRoles = roles.filter((r) => r.getIsDefault());
    if (defaultRoles.length > 1) {
      throw new UnprocessableEntityException('Hanya boleh ada satu role default dalam sistem.');
    }
  }

  static assignDefaultRole(roles: RoleEntity[], targetRoleUid: string, actor: string): RoleEntity[] {
    const target = roles.find((r) => r.get('uid') === targetRoleUid);
    if (!target) {
      throw new UnprocessableEntityException('Role tidak ditemukan.');
    }

    for (const role of roles) {
      if (role.get('uid') === targetRoleUid) {
        role.setAsDefault(actor);
      } else {
        role.unsetDefault(actor);
      }
    }

    this.ensureSingleDefault(roles);
    return roles;
  }
}
