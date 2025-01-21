import { Auth, Authenticated } from './auth.ts';

export const AUTH_REPOSITORY = 'AuthRepository';

export interface AuthRepository {
  authenticate(auth: Auth): Promise<Authenticated | null>;
}
