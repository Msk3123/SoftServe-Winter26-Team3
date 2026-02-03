import { api, postJson } from '../../../api/Api';

export type LoginRequest = {
    email: string;
    password: string;
};

export type SignUpRequest = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type AuthResponse = {
    accessToken: string;
    userId: number;
    email: string;
    role: string;
};

export const authApi = {
    login: (req: LoginRequest) => postJson<AuthResponse>(api.buildUrl('auth/login'), req),
    signup: (req: SignUpRequest) => postJson<AuthResponse>(api.buildUrl('auth/signup'), req),
};
