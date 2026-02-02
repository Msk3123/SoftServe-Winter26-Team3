import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { authStorage } from './authStorage';
import type { AuthState, AuthUser } from './authState';

type AuthContextValue = AuthState & {
    setSession: (session: { accessToken: string; user: AuthUser }) => void;
    logout: () => void;
};

const initialState: AuthState = {
    isAuthenticated: false,
    accessToken: null,
    user: null,
};

export const AuthContext = createContext<AuthContextValue>({
    ...initialState,
    setSession: () => undefined,
    logout: () => undefined,
});

const USER_KEY = 'cinema.user';

function loadUser(): AuthUser | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw) as AuthUser;
    } catch {
        return null;
    }
}

function saveUser(user: AuthUser | null) {
    if (!user) {
        localStorage.removeItem(USER_KEY);
        return;
    }

    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>(() => {
        const token = authStorage.getToken();
        const user = loadUser();

        return {
            isAuthenticated: Boolean(token),
            accessToken: token,
            user: token ? user : null,
        };
    });

    useEffect(() => {
        // Якщо токен очищений вручну — чистимо і юзера
        if (!state.accessToken) {
            saveUser(null);
        }
    }, [state.accessToken]);

    const setSession = useCallback((session: { accessToken: string; user: AuthUser }) => {
        authStorage.setToken(session.accessToken);
        saveUser(session.user);
        setState({ isAuthenticated: true, accessToken: session.accessToken, user: session.user });
    }, []);

    const logout = useCallback(() => {
        authStorage.clear();
        saveUser(null);
        setState(initialState);
    }, []);

    const value = useMemo<AuthContextValue>(() => ({ ...state, setSession, logout }), [state, setSession, logout]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
