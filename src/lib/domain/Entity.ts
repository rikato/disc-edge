export abstract class Entity<T> {
  private _uid: string;

  protected constructor(uid: string) {
    this._uid = uid;
  }

  public get uid(): string {
    return this._uid;
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
}

export interface IAggregateRoot {}
