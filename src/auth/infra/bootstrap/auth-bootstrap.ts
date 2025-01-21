import { container } from 'tsyringe';
import { Bootstrap } from '../../../common/bootstrap/bootstrap.ts';
import { AUTH_REPOSITORY } from '../../domain/auth-repository.ts';
import { AUTH_SERVICE, AuthService } from '../../domain/auth-service.ts';
import { AuthMysqlRepository } from '../repository/auth-repository.ts';

export class AuthBootstrap implements Bootstrap {
  async init(): Promise<void> {
    container.register(AUTH_REPOSITORY, AuthMysqlRepository);
    container.register(AUTH_SERVICE, AuthService);
  }
}
