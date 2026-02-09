import { Navigate, useParams, Outlet } from "react-router";
import { getDecodedToken, isTokenExpired } from "../helpers/authHelper";

interface ProtectedRouteProps {
    requiredRole?: string;
}

const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
    const { userId } = useParams(); 
    const decoded = getDecodedToken();

    if (!decoded || isTokenExpired()) {
        localStorage.clear(); 
        return <Navigate to="/auth/login" replace />;
    }

    const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decoded.role;

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/home" replace />;
    }
    if (userId && userRole !== "Admin" && decoded.nameid !== userId) {
        return <Navigate to="/home" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;