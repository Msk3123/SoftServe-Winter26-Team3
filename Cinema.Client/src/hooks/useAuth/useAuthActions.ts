import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { authApi } from "../../api/authApi";
import type { LoginDto, RegisterDto } from "../../types/auth.types";

export const useAuthActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (dto: LoginDto) => {
    setIsLoading(true);
    try {
        const data = await authApi.login(dto);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        // === ДОДАНО: Логіка редиректу за роллю ===
        const decoded: any = jwtDecode(data.accessToken);
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decoded.role;

        if (role === "Admin") {
        navigate("/admin/movies"); // Адміна шлемо в панель
        } else {
        navigate("/home"); // Юзера на головну
        }
    } catch (err: any) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
    };

  const signup = async (dto: RegisterDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authApi.register(dto);
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/home");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, signup, isLoading, error };
};