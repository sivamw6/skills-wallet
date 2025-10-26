import { useAuth as useAuthContext } from "../App";

/**
 * Custom hook for authentication
 * Provides session data and logout functionality
 */
export function useAuth() {
  const { session, setSession } = useAuthContext();
  const isAuthenticated = !!session?.isAuthenticated;

  const logout = () => {
    setSession(null);
  };

  return {
    session,
    isAuthenticated,
    logout,
    user: session,
  };
}


