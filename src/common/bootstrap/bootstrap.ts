export type BootstrapConstructor = new () => Bootstrap;

export interface Bootstrap {
  init(): Promise<void>;
}
