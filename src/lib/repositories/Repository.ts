export abstract class Repository<T> {
  abstract get(): Promise<T>;
}
