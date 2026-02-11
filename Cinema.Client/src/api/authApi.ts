import type { LoginDto, RegisterDto, AuthResponseDto } from "../types/auth.types";
import { baseUrl, postItem } from "./api";

const API_URL = baseUrl ? `auth`: "https://localhost:7249/api/auth";

export const authApi = {
  login: async (dto: LoginDto): Promise<AuthResponseDto> => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
    if (!response.ok) throw new Error("Invalid email or password");
    return response.json();
  },

  register: async (dto: RegisterDto): Promise<AuthResponseDto> => {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
    if (!response.ok) throw new Error("Registration failed");
    return response.json();
  },

  refresh: async (dto: AuthResponseDto): Promise<AuthResponseDto> => {
    const response = await fetch(`${API_URL}/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
    return response.json();
  },

  verifyPassword: async (password:string):Promise<void> =>{
    return postItem<{password: string},void>(`${API_URL}/verify-password`,{password: password});
  }
};