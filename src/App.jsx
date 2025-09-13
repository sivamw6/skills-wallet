/* eslint-disable react-refresh/only-export-components */
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useMemo } from "react";

// Pages
import Login from "./pages/Login";
import Assessment from "./pages/provider/Assessment";
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import IssueCredential from "./pages/provider/IssueCredential";
import BlockchainRecords from "./pages/provider/BlockchainRecords";
import StudentDetail from "./pages/provider/StudentDetail";
import VerifierDashboard from "./pages/verifier/VerifierDashboard";

// A tiny in-memory auth context (PoC-level)
export default function App() {
  const [session, setSession] = useState(null);
  const value = useMemo(() => ({ session, setSession }), [session]);

  return (
    <AuthContext.Provider value={value}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Assessment route (protected) */}
        <Route
          path="/assessment/:id?"
          element={
            <RequireRole role="provider">
              <Assessment />
            </RequireRole>
          }
        />

        {/* Provider routes (protected) */}
        <Route
          path="/provider/dashboard"
          element={
            <RequireRole role="provider">
              <ProviderDashboard />
            </RequireRole>
          }
        />
        <Route
          path="/provider/issue"
          element={
            <RequireRole role="provider">
              <IssueCredential />
            </RequireRole>
          }
        />
        <Route
          path="/provider/chain"
          element={
            <RequireRole role="provider">
              <BlockchainRecords />
            </RequireRole>
          }
        />
        <Route
          path="/provider/student/:studentId"
          element={
            <RequireRole role="provider">
              <StudentDetail />
            </RequireRole>
          }
        />

        {/* Verifier routes (protected) */}
        <Route
          path="/verifier/dashboard"
          element={
            <RequireRole role="verifier">
              <VerifierDashboard />
            </RequireRole>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthContext.Provider>
  );
}

// ---- simple auth helpers ----
import { createContext, useContext } from "react";
export const AuthContext = createContext(null);
export function useAuth() {
  return useContext(AuthContext);
}

function RequireRole({ role, children }) {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/login" replace />;
  }
  if (session.role !== role) {
    // Wrong role → send them to their correct home
    return <Navigate to={session.role === "provider" ? "/provider/dashboard" : "/verifier/dashboard"} replace />;
  }
  return children;
}