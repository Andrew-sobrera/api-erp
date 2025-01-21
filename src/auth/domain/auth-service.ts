import { container, inject, injectable } from 'tsyringe';
import { Auth, Authenticated } from './auth.ts';
import { AUTH_REPOSITORY, AuthRepository } from './auth-repository.ts';

export const AUTH_SERVICE = 'AuthService';

@injectable()
export class AuthService {
  constructor(
    @inject(AUTH_REPOSITORY)
    private readonly authRepository: AuthRepository,
  ) {}

  static createInstance(): AuthService {
    return container.resolve(AUTH_SERVICE);
  }

  async authenticate(auth: Auth): Promise<Authenticated> {
    const userAuthenticated = await this.authRepository.authenticate(auth);
    return userAuthenticated as Authenticated;
  }
}
