import { Context, Next } from 'koa';
import { NotFound } from '../../../exceptions/not-found.ts';
import { Unauthorized } from '../../../exceptions/unauthorized.ts';
import { UnprocessableEntity } from '../../../exceptions/unprocessable-entity.ts';
import { KoaResponse } from '../koa-response.ts';
import { Exception } from '../../../exceptions/exception.ts';

export async function errorMiddleware(ctx: Context, next: Next) {
  try {
    await next();
  } catch (error: any) {
    if (error instanceof NotFound) {
      return KoaResponse.notFound(ctx, {
        error: error.message,
        causes: error.getCauses(),
      });
    }

    if (error instanceof Unauthorized) {
      return KoaResponse.unauthorized(ctx, { error: error.message });
    }

    if (error instanceof UnprocessableEntity) {
      return KoaResponse.unprocessableEntity(ctx, {
        error: error.message,
        causes: error.getCauses(),
      });
    }

    if (error instanceof Exception) {
      return KoaResponse.internalServerError(ctx, { error: error.message });
    }

    return KoaResponse.internalServerError(ctx, {
      error: 'internal_server_error',
    });
  }
}
