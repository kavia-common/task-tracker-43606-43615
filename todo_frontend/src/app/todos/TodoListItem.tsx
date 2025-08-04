"use client";
import { useState } from "react";
import type { Todo } from "../types";
import { useTodos } from "./TodoContext";

export default function TodoListItem({ todo }: { todo: Todo }) {
  const { editTodo, deleteTodo, toggleTodo } = useTodos();
  const [editMode, setEditMode] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newText.trim();
    if (trimmed) {
      editTodo(todo.id, trimmed);
      setEditMode(false);
    }
  };

  return (
    <li className="flex items-center gap-3 rounded px-3 py-2 bg-lightbg border border-secondary/10 shadow-sm group">
      {/* Complete/Uncomplete toggle */}
      <button
        className={`rounded-full w-5 h-5 flex items-center justify-center border-2 ${todo.completed ? "border-primary bg-primary" : "border-secondary/30"} mr-2`}
        title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        onClick={() => toggleTodo(todo.id)}
        aria-label="Toggle complete"
      >
        {todo.completed && <span className="text-white font-bold">&#10003;</span>}
      </button>
      {/* Todo Text or Editable Input */}
      {editMode ? (
        <form onSubmit={handleEdit} className="flex-1 flex items-center">
          <input
            type="text"
            className="px-2 py-1 border border-secondary rounded text-sm flex-1"
            value={newText}
            onChange={e => setNewText(e.target.value)}
            autoFocus
            onBlur={() => setEditMode(false)}
            maxLength={100}
          />
        </form>
      ) : (
        <span
          className={`flex-1 text-base select-text ${todo.completed ? "line-through text-secondary/50" : ""}`}
          onDoubleClick={() => setEditMode(true)}
        >
          {todo.text}
        </span>
      )}
      {/* Edit / Delete buttons */}
      {!editMode && (
        <div className="flex gap-1 opacity-75 group-hover:opacity-100">
          <button
            className="text-xs bg-white border border-secondary/20 rounded px-2 py-1 hover:bg-secondary/5"
            onClick={() => setEditMode(true)}
            title="Edit"
          >Edit</button>
          <button
            className="text-xs text-accent border border-accent/30 rounded px-2 py-1 hover:bg-accent/10"
            onClick={() => deleteTodo(todo.id)}
            title="Delete"
          >Delete</button>
        </div>
      )}
    </li>
  );
}
