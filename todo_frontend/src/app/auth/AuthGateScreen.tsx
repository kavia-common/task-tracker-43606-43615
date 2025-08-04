"use client";
import { useState } from "react";
import { useAuth } from "./AuthContext";

export default function AuthGateScreen() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh]">
      <div className="w-full max-w-xs bg-lightbg shadow rounded-lg p-6 border border-secondary/20">
        <h2 className="font-bold text-xl mb-2 text-primary">
          {isRegistering ? "Register" : "Sign In"}
        </h2>
        {isRegistering ? (
          <RegisterScreen onSwitch={() => setIsRegistering(false)} />
        ) : (
          <LoginScreen onSwitch={() => setIsRegistering(true)} />
        )}
      </div>
    </div>
  );
}

function LoginScreen({ onSwitch }: { onSwitch: () => void }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={async e => {
        e.preventDefault();
        setErr(null);
        if (!email || !pw) return setErr("Email and password required");
        const ok = await login(email);
        if (!ok) setErr("Invalid credentials");
      }}
    >
      <input
        type="email"
        required
        className="px-3 py-2 border rounded text-sm"
        placeholder="Email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoFocus
      />
      <input
        type="password"
        required
        className="px-3 py-2 border rounded text-sm"
        placeholder="Password"
        value={pw}
        onChange={e => setPw(e.target.value)}
      />
      {err && <div className="text-xs text-accent font-medium">{err}</div>}
      <button type="submit" className="mt-2 rounded bg-primary text-white font-semibold py-2 hover:bg-primary/90">
        Sign In
      </button>
      <button
        type="button"
        onClick={onSwitch}
        className="text-xs mt-2 underline text-secondary"
      >
        Don&apos;t have an account? Register
      </button>
    </form>
  );
}

function RegisterScreen({ onSwitch }: { onSwitch: () => void }) {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={async e => {
        e.preventDefault();
        setErr(null);
        if (!email || !pw) return setErr("Email and password required");
        const ok = await register(email);
        if (!ok) setErr("Registration failed");
      }}
    >
      <input
        type="email"
        required
        className="px-3 py-2 border rounded text-sm"
        placeholder="Email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoFocus
      />
      <input
        type="password"
        required
        className="px-3 py-2 border rounded text-sm"
        placeholder="Password"
        value={pw}
        onChange={e => setPw(e.target.value)}
      />
      {err && <div className="text-xs text-accent font-medium">{err}</div>}
      <button type="submit" className="mt-2 rounded bg-primary text-white font-semibold py-2 hover:bg-primary/90">
        Register
      </button>
      <button
        type="button"
        onClick={onSwitch}
        className="text-xs mt-2 underline text-secondary"
      >
        Already have an account? Sign In
      </button>
    </form>
  );
}
