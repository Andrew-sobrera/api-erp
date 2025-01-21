import { injectable } from 'tsyringe';
import { AuthRepository } from '../../domain/auth-repository.ts';
import { Auth, Authenticated } from '../../domain/auth.ts';
import { PrismaClient } from '@prisma/client';

@injectable()
export class AuthMysqlRepository implements AuthRepository {
  private readonly prisma = new PrismaClient();
  async authenticate(auth: Auth): Promise<Authenticated | null> {
    try {
      const response = await this.prisma.user.findFirst({
        where: {
          token: auth.token,
        },
      });

      return response as Authenticated;
    } catch {
      return null;
    }
  }
}
