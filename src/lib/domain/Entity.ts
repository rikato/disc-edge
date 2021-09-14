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

interface IAggregateRoot {}

interface ITodo {
  title: ValueObject<string>;
  completed: ValueObject<boolean>;
}

export class Todo extends Entity<ITodo> implements ITodo {
  private _title: ValueObject<string>;
  private _completed: ValueObject<boolean>;

  private constructor(uid: string, title: string, completed: boolean) {
    super(uid);

    this._title = new ValueObject(title);
    this._completed = new ValueObject(completed);
  }

  public get title(): ValueObject<string> {
    return this._title;
  }

  public get completed(): ValueObject<boolean> {
    return this._completed;
  }

  public static new(title: string, completed: boolean) {
    return new Todo("new", title, completed);
  }

  public static existing(uid: string, title: string, completed: boolean) {
    return new Todo(uid, title, completed);
  }
}

interface ITodoList {
  title: ValueObject<string>;
  todos: ValueObject<Todo[]>;
}

export class TodoList
  extends Entity<ITodoList>
  implements IAggregateRoot, ITodoList
{
  private _title: ValueObject<string>;
  private _todos: ValueObject<Todo[]>;

  private constructor(uid: string, title: string, todos: Todo[]) {
    super(uid);

    this._title = new ValueObject(title);
    this._todos = new ValueObject(todos);
  }

  public get title(): ValueObject<string> {
    return this._title;
  }

  public get todos(): ValueObject<Todo[]> {
    return this._todos;
  }

  public static new(title: string, todos: Todo[]) {
    return new TodoList("new", title, todos);
  }

  public static existing(uid: string, title: string, todos: Todo[]) {
    return new TodoList(uid, title, todos);
  }
}

abstract class Repository<T> {
  abstract get(): Promise<T>;
}

export class TodoListRepository extends Repository<TodoList> {
  constructor() {
    super();
  }

  public get(): Promise<TodoList> {
    const todo1 = Todo.existing("t-1", "todo 1", false);
    const todo2 = Todo.existing("t-2", "todo 2", false);
    const todo3 = Todo.existing("t-3", "todo 3", false);

    const todoList1 = TodoList.existing("tl-1", "Todo list 1", [
      todo1,
      todo2,
      todo3,
    ]);

    return new Promise(() => todoList1);
  }
}
