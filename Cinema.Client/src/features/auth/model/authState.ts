export type AuthUser = {
    userId: number;
    email: string;
    role: string;
};

export type AuthState = {
    isAuthenticated: boolean;
    accessToken: string | null;
    user: AuthUser | null;
};
