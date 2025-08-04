"use client";

import { useAuth } from "./auth/AuthContext";
import TodoMainView from "./todos/TodoMainView";
import AuthGateScreen from "./auth/AuthGateScreen";

export default function Home() {
  const { user } = useAuth();

  if (!user) {
    return <AuthGateScreen />;
  }
  return <TodoMainView />;
}
