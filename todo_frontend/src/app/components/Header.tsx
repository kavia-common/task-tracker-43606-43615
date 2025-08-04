"use client";
import { useAuth } from "../auth/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full flex items-center justify-between py-4 px-6 border-b border-secondary/10 bg-lightbg/80 gap-2">
      <div className="text-xl font-semibold font-sans text-primary">Tasks</div>
      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="font-mono text-secondary">
              {user.displayName || user.email}
            </span>
            <button
              onClick={logout}
              className="rounded px-3 py-1.5 bg-secondary text-white text-xs font-medium hover:bg-secondary/80 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
