import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./authProvider"

const PrivateRoutes = ({ requiredRole }) => {
  const { isAuthenticated, userRole, loading } = useAuth();
  const location = useLocation();

  // Show loading indicator or nothing while checking auth
  if (loading) {
    return <div>Loading...</div>; // Or return null for no visual indication
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  // For admin routes (dashboard, users, blogs)
  if (requiredRole === "admin") {
    // Allow both admin and user roles to access
    if (userRole !== "admin" && userRole !== "user") {
      return <Navigate to={"/"} replace />
    }
  }
  // For other routes that require specific roles
  else if (requiredRole && userRole !== requiredRole) {
    return <Navigate to={"/"} replace />
  }

  return <Outlet />
}

export default PrivateRoutes;