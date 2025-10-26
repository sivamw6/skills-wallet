import { useNavigate } from "react-router-dom";

/**
 * Custom hook for navigation with common patterns
 */
export function useNavigation() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login", { replace: true });
  };

  const goToDashboard = (role = "provider") => {
    navigate(`/${role}/dashboard`);
  };

  const goBack = () => {
    navigate(-1);
  };

  const goToProviderDashboard = () => {
    navigate("/provider/dashboard");
  };

  const goToVerifierDashboard = () => {
    navigate("/verifier/dashboard");
  };

  return {
    navigate,
    goToLogin,
    goToDashboard,
    goBack,
    goToProviderDashboard,
    goToVerifierDashboard,
  };
}

