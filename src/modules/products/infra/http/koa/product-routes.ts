import Router from '@koa/router';
import { ProductService } from '../../../domain/products-service.ts';
import { Context } from 'koa';
import { KoaResponse } from '../../../../../common/http/koa/koa-response.ts';
import { ProductCreate } from '../../../domain/product.ts';

export function productRoutes(router: Router) {
  const { getAll, getById, create, update, destroy } = accountRoutesBuilder();

  router.get('/products', getAll);
  router.get('/products/:id', getById);
  router.post('/products', create);
  router.put('/products/:id', update);
  router.delete('/products/:id', destroy);
}

function accountRoutesBuilder() {
  const service = ProductService.getInstance();

  async function getAll(ctx: Context) {
    const response = await service.getAll(ctx);
    KoaResponse.success(ctx, response);
  }

  async function getById(ctx: Context) {
    const response = await service.getById(ctx);
    KoaResponse.success(ctx, response);
  }

  async function create(ctx: Context) {
    const body = ctx.request.body;
    const response = await service.create(ctx, body as ProductCreate);
    KoaResponse.created(ctx, response);
  }

  async function update(ctx: Context) {
    const response = await service.update(ctx.params.id, ctx.request.body);
    KoaResponse.success(ctx, response);
  }

  async function destroy(ctx: Context) {
    await service.delete(ctx.params.id);
    KoaResponse.noContent(ctx);
  }

  return {
    getAll,
    getById,
    create,
    update,
    destroy,
  };
}
