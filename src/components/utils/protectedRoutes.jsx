import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./authProvider"

const PrivateRoutes = ({requiredRole}) => {
  const { isAuthenticated, userRole, loading } = useAuth();
  const location = useLocation();
  
  // Show loading indicator or nothing while checking auth
  if (loading) {
    return <div>Loading...</div>; // Or return null for no visual indication
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to={"/"} replace />
  }

  return <Outlet />
} 

export default PrivateRoutes;