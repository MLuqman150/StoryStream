import { useAuth } from "../../context/AuthContext"
import { Navigate,Outlet } from "react-router-dom"

const PublicRoutes = () => {
    const isLoggedOut = useAuth().token
    
    return isLoggedOut === null ? <Outlet/> : <Navigate to="home" />
}

export default PublicRoutes