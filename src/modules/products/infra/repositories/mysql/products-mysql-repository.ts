import { PrismaClient } from '@prisma/client';
import { ProductsRepository } from '../../../domain/products-repository.ts';
import { Context } from 'koa';
import { Product, ProductCreate } from '../../../domain/product.ts';
import { GetProductError } from '../../../domain/exceptions/get-product-error.ts';
import { ProductCreateError } from '../../../domain/exceptions/product_create_error.ts';

export class ProductMysqlRepository implements ProductsRepository {
  private readonly prisma = new PrismaClient();

  async findAll(ctx: Context): Promise<Product[]> {
    try {
      return await ctx.prisma.product.findMany();
    } catch (e: any) {
      throw new GetProductError(e);
    }
  }
  async findById(ctx: Context): Promise<Product> {
    try {
      const productId = Number(ctx.params.id);

      const product = await ctx.prisma.product.findUnique({
        where: { id: productId },
      });

      return product as Product;
    } catch (e: any) {
      throw new GetProductError(e);
    }
  }
  create(ctx: Context, data: ProductCreate): Promise<Product> {
    try {
      return ctx.prisma.product.create({
        data: {
          ...data,
        },
      });
    } catch (e: any) {
      console.log(e);
      throw new ProductCreateError(e);
    }
  }
  update(id: string, data: any): Promise<any> {
    return this.prisma.product.update({
      where: { id: Number(id) },
      data: data,
    });
  }
  delete(id: string): Promise<any> {
    return this.prisma.product.delete({
      where: { id: Number(id) },
    });
  }
}
