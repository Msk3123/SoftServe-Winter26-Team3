import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { authApi } from "../../api/authApi";
import type { LoginDto, RegisterDto } from "../../types/auth.types";

export const useAuthSessionActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginForSession = async (dto: LoginDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authApi.login(dto);
      
      // Зберігаємо токени
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      const decoded: any = jwtDecode(data.accessToken);
      const role = 
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || 
        decoded.role;

      // ПОВЕРТАЄМО дані для компонента Login.tsx
      return { data, role };
    } catch (err: any) {
      setError(err.message);
      throw err; // Важливо, щоб Login.tsx зупинив виконання
    } finally {
      setIsLoading(false);
    }
  };

  const signupForSession = async (dto: RegisterDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authApi.register(dto);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      const decoded: any = jwtDecode(data.accessToken);
      const role = decoded.role || "User";

      return { data, role };
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { loginForSession, signupForSession, isLoading, error };
};