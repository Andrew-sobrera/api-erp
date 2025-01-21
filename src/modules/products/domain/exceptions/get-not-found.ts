import { NotFound } from '../../../../common/exceptions/not-found.ts';

export class ProductNotFound extends NotFound {
  constructor() {
    super('product_not_found');
  }
}
