export interface User {
  id: number;
  email: string;
  role: string;
  firstName: string;
  lastName?: string;
}

export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiration: string;
}

export type LoginDto = Pick<User, 'email'> & { password: string };
export type RegisterDto = Omit<User, 'id' | 'role'> & { password: string; confirmPassword: string };