import { Exception, ExceptionCauses } from './exception.ts';

export class UnprocessableEntity extends Exception {
  constructor(causes: ExceptionCauses = []) {
    super('unprocessable-entity', causes);
  }
}
