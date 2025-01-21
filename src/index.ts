import 'dotenv/config';
import 'reflect-metadata';

import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import { auth } from './common/http/koa/middleware/auth-middleware.ts';
import { errorMiddleware } from './common/http/koa/middleware/error-middleware.ts';
import { productRoutes } from './modules/products/infra/http/koa/product-routes.ts';
import { BootstrapInit } from './common/bootstrap/bootstrap-init.ts';
import { ProductBootstrap } from './modules/products/infra/bootstrap/product-bootstrap.ts';
import { Configuration } from './common/configuration/configuration.ts';
import { AuthBootstrap } from './auth/infra/bootstrap/auth-bootstrap.ts';

export async function main() {
  await BootstrapInit.init([ProductBootstrap, AuthBootstrap]);

  const app = new Koa();
  const router = new Router();

  productRoutes(router);

  app.use(bodyParser());
  app.use(errorMiddleware);
  app.use(auth);
  app.use(router.routes());

  const PORT = Configuration.get('PORT') || 3000;

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

main();
