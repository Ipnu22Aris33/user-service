export class RoleVO {
  private constructor(private readonly value: string) {}

  static create(value: string) {
    this.validate(value);
    return new RoleVO(value);
  }
  static getAdminRole() {
    return new RoleVO('admin');
  }
  static getUserRole() {
    return new RoleVO('user');
  }

  static fromValue(value: string) {
    return new RoleVO(value);
  }
  getValue() {
    return this.value;
  }
  equals(role: RoleVO) {
    return this.value === role.value;
  }

  private static validate(value: string) {
    if (value !== 'admin' && value !== 'user') {
      throw new Error('Role must be admin or user');
    }
  }
}
