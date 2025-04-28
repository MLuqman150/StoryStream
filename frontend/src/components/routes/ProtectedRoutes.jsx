import { useAuth } from "../../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const isAuthenticated = useAuth().token
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes

