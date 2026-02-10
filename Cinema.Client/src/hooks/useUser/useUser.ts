import { useState, useEffect } from 'react';
import { getUserIdFromToken } from '../../helpers/authHelper';
import { getItem } from '../../api/api';

interface UserData {
  id: number;
  email?: string;
  lastName?:string
  firstName?:string
  phoneNumber?: string;
  role?: string;
}


export const useUser = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = getUserIdFromToken();
      
      if (userId) {
        try {
          const response: any = await getItem("User", userId);
          setUser(response);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  return { user, userId: user?.id, isLoading };
};