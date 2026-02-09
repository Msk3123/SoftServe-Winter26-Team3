// src/router/ProtectedRoute.tsx
import { Navigate, useParams, Outlet } from "react-router";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
    requiredRole?: string;
}

const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
    const { userId } = useParams(); 
    const token = localStorage.getItem("accessToken");

    if (!token) return <Navigate to="/auth/login" replace />;

    try {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
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
    } catch (error) {
        localStorage.clear();
        return <Navigate to="/auth/login" replace />;
    }
};

export default ProtectedRoute;