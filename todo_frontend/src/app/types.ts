export interface Todo {
  id: string; // UUID or unique string
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
}

export type TodoFilter = "all" | "active" | "completed";

export interface User {
  id: string;
  email: string;
  displayName?: string;
}
