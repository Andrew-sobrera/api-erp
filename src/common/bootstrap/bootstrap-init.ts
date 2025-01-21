import { Bootstrap, BootstrapConstructor } from './bootstrap.ts';

export abstract class BootstrapInit {
  static async init(bootstraps: BootstrapConstructor[]): Promise<void> {
    const toInstantiate = (Bootstrap: BootstrapConstructor) => new Bootstrap();
    const toInit = (bootstrap: Bootstrap) => bootstrap.init();
    await Promise.all(bootstraps.map(toInstantiate).map(toInit));
  }
}
