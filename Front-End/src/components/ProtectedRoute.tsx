// ============================================================================
// LEAVEFLOW — PROTECTED ROUTE
// Author: Aiden Brown
// ============================================================================
// A reusable wrapper component that guards a page, redirecting away if the
// visitor isn't logged in (or isn't the right role for that page).
// ============================================================================

import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth, type Role } from "../context/AuthContext";

export default function ProtectedRoute({
  children,      // the actual page component being protected
  allowedRoles,   // optional — restrict to specific role(s)
}: {
  children: ReactNode;
  allowedRoles?: Role[];
}) {
  const { user } = useAuth();

  // <Navigate> is React Router's way of redirecting programmatically.
  // "replace" means this redirect doesn't add a new entry to browser
  // history, so clicking "back" doesn't bounce the user between the login
  // page and the page that just rejected them.
  //
  // Not logged in at all: we don't know what role they were, so we can't
  // pick a specific login screen — /login (employee login) is the sensible
  // general entry point, and it links onward to /hr/login for HR users.
  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Logged in, but on the wrong page for their role (e.g. an HR manager
    // who manually typed /employee/dashboard into the URL). They ARE
    // authenticated, so send them to their own correct dashboard instead of
    // back to a login screen they've already passed.
    return <Navigate to={user.role === "hr_manager" ? "/hr/dashboard" : "/employee/dashboard"} replace />;
  }

  // If we get past both checks, render the actual protected page.
  return <>{children}</>;
  // The empty <></> ("fragment") just lets us return children without
  // wrapping them in an unnecessary extra HTML element.
}
