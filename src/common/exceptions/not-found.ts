import { Exception } from './exception.ts';

export class NotFound extends Exception {
  constructor(subject: string) {
    super('not_found', [subject]);
  }
}
