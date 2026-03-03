import { Navigate, Outlet } from "react-router-dom";
import useAdminAuth from "./authmiddleware"; 

const ProtectedADMIN = () => {
  const { isAdmin, checking } = useAdminAuth();

  if (checking) return <div>Checking admin access...</div>;

  return isAdmin ? <Outlet /> : <Navigate to="/register" replace />;
};

export default ProtectedADMIN; 
 