import { TokenEntity } from "@domain/entities/token.entity";

export const TOKEN_OUT_PORT = Symbol('TOKEN_OUT_PORT');
export const TOKEN_IN_PORT = Symbol('TOKEN_IN_PORT');

export interface TokenOutPort {
  save(token: TokenEntity): Promise<TokenEntity>;
  findByToken(token: string): Promise<TokenEntity | null>;
}

