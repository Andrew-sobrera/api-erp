import { Exception } from './exception.ts';

export class Unauthorized extends Exception {
  constructor() {
    super('unauthorized');
  }
}
