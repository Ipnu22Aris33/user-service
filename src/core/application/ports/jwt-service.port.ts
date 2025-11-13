export const JWT_SERVICE_PORT = Symbol('JWT_SERVICE_PORT');

export interface JwtServicePort {
  sign(payload: Record<string, any>, options?: JwtSignOptions): Promise<string>;
  verify<T extends object = any>(token: string, options?: JwtVerifyOptions): Promise<T>;
}

export interface JwtSignOptions {
  expiresIn?: string | number;
  secret?: string;
}

export interface JwtVerifyOptions {
  secret?: string;
}
