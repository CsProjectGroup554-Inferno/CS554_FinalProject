import { useContext } from "react";
import { AuthorizeContext } from "./Authorize";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user } = useContext(AuthorizeContext);
  if (!user) {
    return <Navigate replace to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
