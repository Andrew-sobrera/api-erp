import { Context, Next } from 'koa';
import { KoaResponse } from '../koa-response.ts';
import { AuthService } from '../../../../auth/domain/auth-service.ts';
import { isEmpty } from '../../../helper.ts';
import prismaHelper from '../../../database/prisma/prisma-helper.ts';

export async function auth(ctx: Context, next: Next): Promise<void> {
  let { authorization } = ctx.headers;
  authorization = authorization?.replace('Bearer ', '');

  if (isEmpty(authorization)) {
    return KoaResponse.unauthorized(ctx, { error: 'unauthorized' });
  }

  const response = await AuthService.createInstance().authenticate({
    token: authorization as string,
  });

  if (isEmpty(response)) {
    return KoaResponse.unauthorized(ctx, { error: 'unauthorized' });
  }

  ctx.auth = response;
  ctx.prisma = prismaHelper(ctx);

  return next();
}
