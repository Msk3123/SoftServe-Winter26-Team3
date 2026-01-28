import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, type LoginRequest, type SignUpRequest } from '../api/authApi';
import { authStorage } from './authStorage';

type AuthStatus = {
    isLoading: boolean;
    error: string | null;
};

export function useAuthActions() {
    const navigate = useNavigate();
    const [status, setStatus] = useState<AuthStatus>({ isLoading: false, error: null });

    const login = useCallback(
        async (req: LoginRequest) => {
            setStatus({ isLoading: true, error: null });
            try {
                const result = await authApi.login(req);
                authStorage.setToken(result.accessToken);
                navigate('/home', { replace: true });
            } catch (e) {
                setStatus({ isLoading: false, error: e instanceof Error ? e.message : 'Unknown error' });
                return;
            }
            setStatus({ isLoading: false, error: null });
        },
        [navigate],
    );

    const signup = useCallback(
        async (req: SignUpRequest) => {
            setStatus({ isLoading: true, error: null });
            try {
                const result = await authApi.signup(req);
                authStorage.setToken(result.accessToken);
                navigate('/home', { replace: true });
            } catch (e) {
                setStatus({ isLoading: false, error: e instanceof Error ? e.message : 'Unknown error' });
                return;
            }
            setStatus({ isLoading: false, error: null });
        },
        [navigate],
    );

    return { ...status, login, signup };
}
