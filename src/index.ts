import {
  Entity,
  Todo,
  TodoList,
  TodoListRepository,
} from "./lib/domain/Entity";

async function main() {
  const repo = new TodoListRepository();

  const todoList = await repo.get();

  console.log(todoList.todos.value.map((t) => console.log(t.title)));

  console.log("hehehehe???");
}

(async () => {
  await main();
})();
