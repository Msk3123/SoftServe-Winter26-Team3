import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  nameid: string;
  role: string;
  exp: number;
  [key: string]: any;
}

export const getDecodedToken = (): JwtPayload | null => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const getUserIdFromToken = (): string | null => {
  const decoded = getDecodedToken();
  return decoded ? decoded.nameid : null;
};

export const isTokenExpired = (): boolean => {
  const decoded = getDecodedToken();
  if (!decoded) return true;
  return decoded.exp < Date.now() / 1000;
};