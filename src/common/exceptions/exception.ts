import { isNotEmpty } from '../helper.ts';

export type Argument = any[];
export type ExceptionCauses = string[] | { [key: string]: string };
export type ExceptionConstructor = new (...args: Argument) => Exception;

export class Exception extends Error {
  constructor(
    key: string = 'internal_server_error',
    protected readonly causes: ExceptionCauses = [],
  ) {
    super(key);
  }

  getCauses(): ExceptionCauses {
    return this.causes;
  }

  static throwIf(
    condition: boolean,
    Exception: ExceptionConstructor,
    args?: any[],
  ): void {
    if (!condition) return;

    if (isNotEmpty(args)) throw Exception.apply(null, args as any[]);
    else throw new Exception();
  }
}
