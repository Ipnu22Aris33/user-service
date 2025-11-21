/**
 * Enumeration of available validation rules.
 */
export enum Rules {
  IS_STRING = 'isString',
  IS_NUMBER = 'isNumber',
  IS_NOT_EMPTY = 'isNotEmpty',
  IS_BETWEEN = 'isBetween',
  IS_EMAIL = 'isEmail',
  IS_MIN_LENGTH = 'isMinLength',
  IS_MAX_LENGTH = 'isMaxLength',
  IS_REGEX = 'isRegex',
  IS_ARRAY = 'isArray',
  IS_IN = 'isIn',
}

/**
 * Configuration for a validation rule.
 * Can be either a simple rule name or a detailed configuration object.
 */
export type RuleConfig =
  | Rules
  | {
      /** The rule to apply */
      rule: Rules;
      /** Custom error message override */
      message?: string;
      /** Parameters for the rule (e.g., min/max values, regex pattern) */
      params?: any;
      /** Conditional function to determine if rule should be applied */
      when?: (data: any) => boolean;
    };

/**
 * Configuration for a single field validation.
 */
type FieldConfig = {
  /** Array of validation rules to apply */
  rules: RuleConfig[];
  /** Human-readable label for error messages */
  label?: string;
};

/**
 * Schema defining validation rules for multiple fields.
 * Key is the field name, value is the field configuration.
 */
type ValidationSchema = Record<string, FieldConfig>;

/**
 * Options to customize validation behavior.
 */
type ValidationOptions = {
  /** If true, won't throw errors on validation failure */
  silent?: boolean;
  /** If true, stops validation on first error per field */
  stopOnFirstError?: boolean;
  /** If true, collects all errors from all fields */
  collectAllErrors?: boolean;
};

/**
 * Result of a validation operation.
 */
type ValidationResult = {
  /** Whether validation passed */
  valid: boolean;
  /** Array of all error messages */
  errors: string[];
  /** Errors grouped by field name (only present if validation failed) */
  fieldErrors?: Record<string, string[]>;
};

/**
 * Base validator class providing comprehensive validation functionality.
 * Supports multiple rule types, custom messages, conditional rules, and flexible error handling.
 * 
 * @example
 * ```typescript
 * const schema = {
 *   email: {
 *     rules: [Rules.IS_NOT_EMPTY, Rules.IS_EMAIL],
 *     label: 'Email Address'
 *   },
 *   age: {
 *     rules: [
 *       Rules.IS_NUMBER,
 *       { rule: Rules.IS_BETWEEN, params: { min: 18, max: 100 } }
 *     ]
 *   }
 * };
 * 
 * const result = BaseValidator.validate(schema, { email: 'test@example.com', age: 25 });
 * ```
 */
export class Validator {
  // ===================================================
  // ================ PUBLIC METHOD ====================
  // ===================================================
  
  /**
   * Validates data against a schema.
   * 
   * @param schema - Validation schema defining rules for each field
   * @param data - Data object to validate
   * @param options - Optional validation behavior configuration
   * @returns Validation result with validity status and error details
   * @throws Error if validation fails and silent mode is not enabled
   * 
   * @example
   * ```typescript
   * const result = BaseValidator.validate(
   *   { email: { rules: [Rules.IS_EMAIL] } },
   *   { email: 'invalid' },
   *   { silent: true }
   * );
   * 
   * if (!result.valid) {
   *   console.log(result.errors);
   * }
   * ```
   */
  static validate(schema: ValidationSchema, data: any, options?: ValidationOptions): ValidationResult {
    const ctx = this.createContext(options);
    const { errors, fieldErrors } = this.runValidation(schema, data, ctx);

    const result: ValidationResult = {
      valid: errors.length === 0,
      errors,
      fieldErrors: errors.length === 0 ? undefined : fieldErrors,
    };

    this.handleSilentMode(result, ctx.silent);
    return result;
  }

  // ===================================================
  // ================ PRIVATE HELPERS ==================
  // ===================================================
  
  /**
   * Creates a validation context from options with default values.
   * 
   * @param options - User-provided validation options
   * @returns Normalized context object with defaults applied
   */
  private static createContext(options?: ValidationOptions) {
    return {
      silent: options?.silent ?? false,
      stopOnFirst: options?.stopOnFirstError ?? true,
      collectAll: options?.collectAllErrors ?? false,
    };
  }

  /**
   * Executes validation for all fields in the schema.
   * 
   * @param schema - Validation schema
   * @param data - Data to validate
   * @param ctx - Validation context
   * @returns Object containing all errors and field-specific errors
   */
  private static runValidation(
    schema: ValidationSchema,
    data: Record<string, any>,
    ctx: { silent: boolean; stopOnFirst: boolean; collectAll: boolean },
  ) {
    const errors: string[] = [];
    const fieldErrors: Record<string, string[]> = {};

    for (const [field, config] of Object.entries(schema)) {
      const fieldErrs = this.validateField(field, config, data, ctx);

      if (fieldErrs.length > 0) {
        fieldErrors[field] = fieldErrs;
        errors.push(...fieldErrs);
        if (!ctx.collectAll) break;
      }
    }

    return { errors, fieldErrors };
  }

  /**
   * Validates a single field against its configured rules.
   * 
   * @param field - Field name
   * @param config - Field validation configuration
   * @param data - Complete data object
   * @param ctx - Validation context
   * @returns Array of error messages for this field
   */
  private static validateField(
    field: string,
    config: FieldConfig,
    data: Record<string, any>,
    ctx: { stopOnFirst: boolean },
  ): string[] {
    const label = config.label || field;
    const value = data[field];
    const fieldErrs: string[] = [];

    for (const ruleItem of config.rules) {
      if (this.shouldSkip(ruleItem, data)) continue;

      const error = this.checkRule(label, value, ruleItem, data);
      if (error) {
        fieldErrs.push(error);
        if (ctx.stopOnFirst) break;
      }
    }

    return fieldErrs;
  }

  /**
   * Determines if a rule should be skipped based on conditional logic.
   * 
   * @param ruleItem - Rule configuration
   * @param data - Complete data object for conditional evaluation
   * @returns True if rule should be skipped
   */
  private static shouldSkip(ruleItem: RuleConfig, data: any): boolean {
    return typeof ruleItem !== 'string' && ruleItem.when ? !ruleItem.when(data) : false;
  }

  /**
   * Executes a single validation rule check.
   * 
   * @param field - Field label for error messages
   * @param value - Value to validate
   * @param ruleItem - Rule configuration
   * @param data - Complete data object
   * @returns Error message if validation fails, null if passes
   * @throws Error if rule is not found
   */
  private static checkRule(field: string, value: any, ruleItem: RuleConfig, data: any): string | null {
    const { rule, message, params } =
      typeof ruleItem === 'string' ? { rule: ruleItem, message: undefined, params: undefined } : ruleItem;

    const definition = this.RULES[rule];
    if (!definition) throw new Error(`Rule "${rule}" tidak ditemukan.`);

    const isValid = definition.check(value, params, data);
    return isValid ? null : message || definition.message(field, params);
  }

  /**
   * Handles error throwing based on silent mode configuration.
   * 
   * @param result - Validation result
   * @param silent - Whether to suppress error throwing
   * @throws Error if validation failed and silent mode is disabled
   */
  private static handleSilentMode(result: ValidationResult, silent: boolean): void {
    if (!silent && !result.valid) {
      throw new Error(`Validasi gagal:\n${result.errors.join('\n')}`);
    }
  }

  // ===================================================
  // ================ RULE DEFINITIONS =================
  // ===================================================
  
  /**
   * Built-in validation rules registry.
   * Each rule has a check function and a message generator.
   */
  private static RULES: Record<
    string,
    { 
      /** Function that performs the validation check */
      check: (v: any, p?: any, d?: any) => boolean; 
      /** Function that generates error message */
      message: (f: string, p?: any) => string 
    }
  > = {
    [Rules.IS_STRING]: {
      check: (v) => typeof v === 'string',
      message: (f) => `${f} harus berupa teks.`,
    },
    [Rules.IS_NUMBER]: {
      check: (v) => typeof v === 'number' && !isNaN(v),
      message: (f) => `${f} harus berupa angka.`,
    },
    [Rules.IS_NOT_EMPTY]: {
      check: (v) => {
        if (v == null) return false;
        if (typeof v === 'string') return v.trim() !== '';
        if (Array.isArray(v)) return v.length > 0;
        return true;
      },
      message: (f) => `${f} tidak boleh kosong.`,
    },
    [Rules.IS_BETWEEN]: {
      check: (v, p) => typeof v === 'number' && (p?.min == null || v >= p.min) && (p?.max == null || v <= p.max),
      message: (f, p) => {
        if (p?.min != null && p?.max != null) return `${f} harus antara ${p.min} - ${p.max}.`;
        if (p?.min != null) return `${f} minimal ${p.min}.`;
        if (p?.max != null) return `${f} maksimal ${p.max}.`;
        return `${f} harus dalam rentang yang valid.`;
      },
    },
    [Rules.IS_EMAIL]: {
      check: (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: (f) => `${f} harus email yang valid.`,
    },
    [Rules.IS_MIN_LENGTH]: {
      check: (v, p) => (typeof v === 'string' || Array.isArray(v)) && v.length >= (p?.length || 0),
      message: (f, p) => `${f} minimal ${p?.length || 0} karakter.`,
    },
    [Rules.IS_MAX_LENGTH]: {
      check: (v, p) => (typeof v === 'string' || Array.isArray(v)) && v.length <= (p?.length || Infinity),
      message: (f, p) => `${f} maksimal ${p?.length || 0} karakter.`,
    },
    [Rules.IS_REGEX]: {
      check: (v, p) => typeof v === 'string' && new RegExp(p?.pattern || '.*').test(v),
      message: (f, p) => p?.message || `${f} format tidak valid.`,
    },
    [Rules.IS_ARRAY]: {
      check: (v) => Array.isArray(v),
      message: (f) => `${f} harus berupa array.`,
    },
    [Rules.IS_IN]: {
      check: (v, p) => p?.values?.includes(v),
      message: (f, p) => `${f} harus salah satu dari: ${(p?.values || []).join(', ')}.`,
    },
  };

  // ===================================================
  // ================ CUSTOM RULE SUPPORT ===============
  // ===================================================
  
  /**
   * Registers a custom validation rule.
   * Allows extending the validator with application-specific validation logic.
   * 
   * @param name - Unique name for the custom rule
   * @param check - Validation function that returns true if valid
   * @param message - Function that generates error message
   * 
   * @example
   * ```typescript
   * BaseValidator.addRule(
   *   'isPositive',
   *   (value) => typeof value === 'number' && value > 0,
   *   (field) => `${field} must be a positive number`
   * );
   * ```
   */
  static addRule(
    name: string,
    check: (value: any, params?: any, data?: any) => boolean,
    message: (field: string, params?: any) => string,
  ) {
    // @ts-ignore
    this.RULES[name] = { check, message };
  }
}