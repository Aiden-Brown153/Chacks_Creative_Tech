// ============================================================================
// LEAVEFLOW — AUTH CONTEXT
// Author: Aiden Brown
// ============================================================================
// "Context" is React's built-in way of sharing a piece of data (here: who's
// currently logged in) across many components without manually passing it
// down through every layer in between ("prop drilling").
// ============================================================================

import { createContext, useContext, useState, type ReactNode } from "react";

export type Role = "employee" | "hr_manager";
// A TypeScript "type" — tells the compiler that anywhere a Role is
// expected, only these two exact strings are valid. Catches typos like
// "Employee" or "hr-manager" at build time instead of at runtime.

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: Role;
  department?: string; // the "?" means this field is optional
}

interface AuthContextValue {
  user: AuthUser | null; // null means "nobody is logged in"
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

// Creates the actual Context object. It starts as "undefined" — we enforce
// elsewhere (see useAuth below) that it's never actually used in that
// undefined state.
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * AuthProvider
 * ------------
 * Wraps the entire app (see App.tsx) so that every page nested inside it
 * can access the current user via useAuth().
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  // useState's initial value is computed once, the first time this
  // component ever renders, by checking if a user was already saved in
  // localStorage from a previous visit — this is what makes a user stay
  // logged in even after refreshing the page.
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("leaveflow_user");
    return stored ? JSON.parse(stored) : null;
  });

  function login(token: string, user: AuthUser) {
    // Persist both the token and user info to localStorage so they survive
    // a page refresh, then update React's in-memory state so the UI
    // re-renders immediately to reflect being logged in.
    localStorage.setItem("leaveflow_token", token);
    localStorage.setItem("leaveflow_user", JSON.stringify(user));
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("leaveflow_token");
    localStorage.removeItem("leaveflow_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth
 * -------
 * A small custom "hook" (a reusable function starting with "use") that any
 * component can call to read the current user or call login/logout,
 * without needing to know anything about how Context works internally.
 * Usage: const { user, login, logout } = useAuth();
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    // This only happens if a developer forgets to wrap the app in
    // <AuthProvider> — failing loudly here makes that mistake obvious
    // immediately, instead of causing a confusing silent bug later.
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
