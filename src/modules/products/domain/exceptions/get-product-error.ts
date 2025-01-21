import { UnprocessableEntity } from '../../../../common/exceptions/unprocessable-entity.ts';

export class GetProductError extends UnprocessableEntity {
  constructor(err: string) {
    super({ error: 'get_product_error', err });
  }
}
