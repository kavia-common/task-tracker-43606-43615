"use client";
import { useTodos } from "./TodoContext";
import TodoListItem from "./TodoListItem";

export default function TodoList() {
  const { todos, filter } = useTodos();

  const filtered = todos.filter(t =>
    filter === "all" ? true
      : filter === "active" ? !t.completed
      : t.completed // filter === "completed"
  );

  if (!todos.length) {
    return <div className="text-center mt-10 text-secondary/60 font-mono">No tasks yet.</div>;
  }

  return (
    <ol className="flex flex-col gap-2 mt-3">
      {filtered.map(todo => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ol>
  );
}
