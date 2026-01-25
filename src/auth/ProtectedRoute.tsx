import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./auth";

const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/staystrong" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
