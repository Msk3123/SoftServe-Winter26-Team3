import { useState, useEffect } from 'react';
import { getUserIdFromToken } from '../../helpers/authHelper';
import { jwtDecode } from 'jwt-decode';

interface UserData {
  id: number;
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  role?: string;
}

export const useUser = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = () => {
      try {
        const token = localStorage.getItem("accessToken");
        const userId = getUserIdFromToken();

        if (token && userId) {
          const decoded: any = jwtDecode(token);
          
          setUser({
            id: Number(userId),
            email: decoded.email || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
            fullName: decoded.name || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
            phoneNumber: decoded.phoneNumber || "",
            role: decoded.role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error decoding user token:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
    
    // Можна додати слухач подій, якщо токен оновлюється в іншому вікні
    window.addEventListener('storage', fetchUser);
    return () => window.removeEventListener('storage', fetchUser);
  }, []);

  return { 
    user, 
    userId: user?.id, 
    isAuthenticated: !!user, 
    isLoading 
  };
};