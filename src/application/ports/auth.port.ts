export interface AuthPort {
  verifyToken(token: string): Promise<any>;
}