"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import type { Todo, TodoFilter } from "../types";

interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  editTodo: (id: string, newText: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  clearCompleted: () => void;
  filter: TodoFilter;
  setFilter: (filter: TodoFilter) => void;
}

const LOCAL_TODO_KEY = "_todo_demo_tasks";

const TodoContext = createContext<TodoContextType | undefined>(undefined);

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>("all");

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(LOCAL_TODO_KEY) : null;
    if (raw) setTodos(JSON.parse(raw));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem(LOCAL_TODO_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      {
        id: genId(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      }
    ]);
  };
  const editTodo = (id: string, newText: string) => {
    setTodos(todos => todos.map(t =>
      t.id === id ? { ...t, text: newText.trim(), updatedAt: new Date().toISOString() } : t));
  };
  const deleteTodo = (id: string) => setTodos(todos => todos.filter(t => t.id !== id));
  const toggleTodo = (id: string) =>
    setTodos(todos => todos.map(t => t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t));
  const clearCompleted = () => setTodos(todos => todos.filter(t => !t.completed));

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        editTodo,
        deleteTodo,
        toggleTodo,
        clearCompleted,
        filter,
        setFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos must be used inside TodoProvider");
  return ctx;
}
