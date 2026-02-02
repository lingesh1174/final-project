import { Navigate } from "react-router-dom";

function AdminGuard({children}){

  const token=localStorage.getItem("adminToken");

  if(!token) return <Navigate to="/admin" />;

  return children;
}

export default AdminGuard;
