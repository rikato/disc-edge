export class Entity<T> {
  private _uid: string;

  protected constructor(uid: string) {
    this._uid = uid;
  }

  public get uid(): string {
    return this._uid;
  }

  public isEqual(other: Entity<T>) {
    return this._uid === other.uid;
  }
}

export class ValueObject<T> {
  private _value: T;

  public constructor(value: T) {
    this._value = value;
  }

  public get value(): T {
    return this._value;
  }

  public isEqual(other: ValueObject<T>) {
    return this._value === other.value;
  }
}

export interface IAggregateRoot {}
