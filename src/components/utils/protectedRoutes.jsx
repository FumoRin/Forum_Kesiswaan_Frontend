import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./authProvider"

const PrivateRoutes = ({requiredRole}) => {
  const { isAuthenticated, userRole } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to={"/"} replace />
  }

  return <Outlet />
} 

export default PrivateRoutes;