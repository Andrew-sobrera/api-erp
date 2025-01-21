import { UnprocessableEntity } from '../../../../common/exceptions/unprocessable-entity.ts';

export class ProductCreateError extends UnprocessableEntity {
  constructor(err: string) {
    super({ error: 'product_create_error', err });
  }
}
