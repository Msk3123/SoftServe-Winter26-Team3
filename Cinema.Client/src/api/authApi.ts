import type { LoginDto, RegisterDto, AuthResponseDto } from "../types/auth.types";
import { baseUrl, postItem } from "./api";

const API_URL = baseUrl ? `auth`: "https://localhost:7249/api/auth";

export const authApi = {
  login: async (dto: LoginDto): Promise<AuthResponseDto> => {
    try{
      return postItem<LoginDto,AuthResponseDto>(`${API_URL}/login`,dto)
    }catch{
      throw new Error("Invalid email or password");
    }
  },

  register: async (dto: RegisterDto): Promise<AuthResponseDto> => {
    try{
      return postItem<RegisterDto,AuthResponseDto>(`${API_URL}/register`,dto)
    }catch{
      throw new Error("Registration failed");
    }
  },

  refresh: async (dto: AuthResponseDto): Promise<AuthResponseDto> => {
    return postItem<AuthResponseDto,AuthResponseDto>(`${API_URL}/refresh-token`,dto)
  },

  verifyPassword: async (password:string):Promise<void> =>{
    return postItem<{password: string},void>(`${API_URL}/verify-password`,{password: password});
  }
};