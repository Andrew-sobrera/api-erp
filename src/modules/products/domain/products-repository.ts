import { Context } from 'koa';
import { Product, ProductCreate } from './product';

export const PRODUCT_REPOSITORY = 'ProductRepository';

export interface ProductsRepository {
  findAll(ctx: Context): Promise<Product[]>;
  findById(ctx: Context): Promise<Product>;
  create(ctx: Context, data: ProductCreate): Promise<Product>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<any>;
}
