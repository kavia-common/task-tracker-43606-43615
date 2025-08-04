"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy localStorage auth for prototype/demo
const LOCAL_USER_KEY = "_todo_user_prototype";

function getFakeUser(email: string): User {
  return { id: email, email, displayName: email.split("@")[0] };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // On load, restore user
    const raw = typeof window !== "undefined" ? localStorage.getItem(LOCAL_USER_KEY) : null;
    if (raw) setUser(JSON.parse(raw));
  }, []);

  // "password" argument omitted for demo implementation
  const login = async (email: string) => {
    // Replace this with real auth integration
    await new Promise(r => setTimeout(r, 300));
    const fake = getFakeUser(email);
    setUser(fake);
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(fake));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_USER_KEY);
  };

  // "password" argument omitted for demo implementation
  const register = async (email: string) => {
    // Replace with real registration
    await new Promise(r => setTimeout(r, 300));
    const fake = getFakeUser(email);
    setUser(fake);
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(fake));
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
