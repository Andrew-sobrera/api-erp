import { container, inject, injectable } from 'tsyringe';
import {
  PRODUCT_REPOSITORY,
  ProductsRepository,
} from './products-repository.ts';
import { Context } from 'koa';
import { Exception } from '../../../common/exceptions/exception.ts';
import { isEmpty } from '../../../common/helper.ts';
import { ProductNotFound } from './exceptions/get-not-found.ts';
import { Product, ProductCreate } from './product.ts';

@injectable()
export class ProductService {
  constructor(
    @inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductsRepository,
  ) {}

  static getInstance(): ProductService {
    return container.resolve(ProductService);
  }

  async getAll(ctx: Context): Promise<Product[]> {
    return await this.productRepository.findAll(ctx);
  }

  async getById(ctx: Context): Promise<Product> {
    const product = await this.productRepository.findById(ctx);

    Exception.throwIf(isEmpty(product), ProductNotFound);

    return product;
  }

  async create(ctx: Context, data: ProductCreate): Promise<Product> {
    return await this.productRepository.create(ctx, data);
  }

  async update(id: string, data: any): Promise<any> {
    return await this.productRepository.update(id, data);
  }

  async delete(id: string): Promise<any> {
    return await this.productRepository.delete(id);
  }
}
