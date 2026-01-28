import { api } from '../../../api/Api';

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

async function postJson<TResponse>(url: string, body: unknown): Promise<TResponse> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `HTTP ${response.status}`);
    }

    return response.json() as Promise<TResponse>;
}

export const authApi = {
    login: (req: LoginRequest) => postJson<AuthResponse>(api.buildUrl('/api/auth/login'), req),
    signup: (req: SignUpRequest) => postJson<AuthResponse>(api.buildUrl('/api/auth/signup'), req),
};
