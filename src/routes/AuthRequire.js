import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../contexts/useAuth";
import LoadingScreen from "../components/LoadingScreen";

function AuthRequire({ children }) {
  const { isInitialized, isAuthenticated } = useAuth();
  const location = useLocation();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("accessToken");

  if (!isInitialized) {
    return <LoadingScreen />;
  }
  if (window.location.pathname === "/" && token) {
    return children;
  } else if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default AuthRequire;
