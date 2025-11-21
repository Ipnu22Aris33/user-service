export class BaseNormalizer {
  /**
   * Recursively converts nullish/empty values to null.
   * - Trims string
   * - Returns null for empty strings
   * - Works for arrays and nested objects
   * - Keeps null values (does not remove keys)
   */
  static toNullable<T>(value: T | null | undefined): T | null {
    if (value === undefined || value === null) return null;

    if (typeof value === 'string') {
      const trimmed = value.trim();
      return trimmed === '' ? null : (trimmed as unknown as T);
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.toNullable(item)) as unknown as T;
    }

    if (typeof value === 'object') {
      const result: Record<string, any> = {};
      for (const [key, val] of Object.entries(value)) {
        result[key] = this.toNullable(val);
      }
      return result as T;
    }

    return value;
  }

  /**
   * Convert string(s) or object properties to lowercase recursively.
   * - Trims string
   * - Supports array of strings
   * - Supports nested objects / value objects
   */
  static toLowercase<T>(value: T): T {
    if (typeof value === 'string') {
      return value.trim().toLowerCase() as unknown as T;
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.toLowercase(item)) as unknown as T;
    }

    if (value && typeof value === 'object') {
      const normalizedObj: any = {};
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          normalizedObj[key] = this.toLowercase((value as any)[key]);
        }
      }
      return normalizedObj;
    }

    return value;
  }

  /**
   * Convert string(s) or object properties to uppercase recursively.
   * - Trims string
   * - Supports array of strings
   * - Supports nested objects / value objects
   */
  static toUppercase<T>(value: T): T {
    if (typeof value === 'string') {
      return value.trim().toUpperCase() as unknown as T;
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.toUppercase(item)) as unknown as T;
    }

    if (value && typeof value === 'object') {
      const normalizedObj: any = {};
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          normalizedObj[key] = this.toUppercase((value as any)[key]);
        }
      }
      return normalizedObj;
    }

    return value;
  }

  /**
   * Convert string(s) or object properties to capitalize recursively.
   * - Trims string
   * - Supports array of strings
   * - Supports nested objects / value objects
   */
  static toCapitalize<T>(value: T): T {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed.length === 0) return '' as unknown as T;
      return (trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()) as unknown as T;
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.toCapitalize(item)) as unknown as T;
    }

    if (value && typeof value === 'object') {
      const normalizedObj: any = {};
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          normalizedObj[key] = this.toCapitalize((value as any)[key]);
        }
      }
      return normalizedObj;
    }

    return value;
  }
}
