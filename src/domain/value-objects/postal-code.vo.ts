export class PostalCodeVO {
  private constructor(private readonly value: string) {}

  /** Membuat VO baru dengan validasi */
  static create(value: string): PostalCodeVO {
    this.validate(value);
    return new PostalCodeVO(value);
  }

  /** Ambil value mentah */
  getValue(): string {
    return this.value;
  }

  /** Bandingkan dengan PostalCodeVO lain */
  equals(other: PostalCodeVO): boolean {
    return this.value === other.value;
  }

  /** Validasi format postal code */
  private static validate(value: string) {
    if (!value) throw new Error('Postal code is required');
    const trimmed = value.trim();
    if (trimmed.length === 0) throw new Error('Postal code cannot be empty');
    if (!/^\d{5}$/.test(trimmed))
      throw new Error('Postal code must be 5 digits');
  }
}
