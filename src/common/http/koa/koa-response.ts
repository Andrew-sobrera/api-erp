import { Context } from 'vm';

export abstract class KoaResponse {
  static success(ctx: Context, body: any) {
    ctx.status = 200;
    ctx.body = body;
  }

  static created(ctx: Context, body: any) {
    ctx.status = 201;
    ctx.body = body;
  }

  static noContent(ctx: Context) {
    ctx.status = 204;
  }

  static badRequest(ctx: Context, body: any) {
    ctx.status = 400;
    ctx.body = body;
  }

  static unauthorized(ctx: Context, body: any) {
    ctx.status = 401;
    ctx.body = body;
  }

  static notFound(ctx: Context, body: any) {
    ctx.status = 404;
    ctx.body = body;
  }

  static unprocessableEntity(ctx: Context, body: any) {
    ctx.status = 422;
    ctx.body = body;
  }

  static internalServerError(ctx: Context, body: any) {
    ctx.status = 500;
    ctx.body = body;
  }

  private static response(ctx: Context, status: number, body: any) {
    ctx.status = status;
    ctx.body = body;
  }
}
