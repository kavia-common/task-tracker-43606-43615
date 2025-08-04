"use client";
import { useState } from "react";
import { useTodos } from "./TodoContext";
import TodoList from "./TodoList";
import type { TodoFilter } from "../types";

export default function TodoMainView() {
  const { addTodo, clearCompleted, filter, setFilter, todos } = useTodos();
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim()) {
      setPending(true);
      addTodo(input.trim());
      setInput("");
      setPending(false);
    }
  }

  const filters: TodoFilter[] = ["all", "active", "completed"];

  return (
    <div className="flex flex-col gap-6">
      {/* Add Todo */}
      <form
        className="flex mt-4 gap-2"
        onSubmit={handleAdd}
      >
        <input
          type="text"
          className="flex-1 border border-secondary rounded py-2 px-3 focus:outline-primary bg-lightbg"
          placeholder="What needs to be done?"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={pending}
          autoFocus
        />
        <button
          className="bg-accent text-white px-4 py-2 rounded hover:bg-accent/90 font-semibold"
          type="submit"
          disabled={pending}
          aria-label="Add task"
        >
          Add
        </button>
      </form>
      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-2 text-xs md:text-sm font-mono">
        <div className="flex gap-2">
          {filters.map(f => (
            <button
              key={f}
              className={`rounded px-3 py-1 font-semibold transition ${
                filter===f
                  ? "bg-primary text-white shadow"
                  : "text-secondary hover:bg-primary/10"
              }`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <button
          className="text-accent underline-offset-4 hover:underline"
          onClick={clearCompleted}
          disabled={!todos.some(t => t.completed)}
        >
          Clear Completed
        </button>
      </div>
      {/* Todo List */}
      <TodoList />
    </div>
  );
}
