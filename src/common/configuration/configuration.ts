import { isNotEmpty } from '../helper.ts';

export abstract class Configuration {
  static get<T = any>(key?: string): T {
    if (isNotEmpty(key)) {
      // @ts-expect-error keys of process.env are string
      return process.env[key] as T;
    }
    return process.env as T;
  }
}
