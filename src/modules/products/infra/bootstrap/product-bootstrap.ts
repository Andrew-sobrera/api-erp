import { container } from 'tsyringe';
import { Bootstrap } from '../../../../common/bootstrap/bootstrap.ts';
import { PRODUCT_REPOSITORY } from '../../domain/products-repository.ts';
import { ProductMysqlRepository } from '../repositories/mysql/products-mysql-repository.ts';
import { ProductService } from '../../domain/products-service.ts';

export class ProductBootstrap implements Bootstrap {
  async init(): Promise<void> {
    container.register(PRODUCT_REPOSITORY, ProductMysqlRepository);
    container.register(ProductService, ProductService);
  }
}
