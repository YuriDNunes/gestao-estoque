import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "../utils/auth";

const ProtectedRoute = ({ allowedRoles }) => {
  const role = getUserRole();

  if (!role) {
    return <Navigate to={"/"} replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to={"/admin/products"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
