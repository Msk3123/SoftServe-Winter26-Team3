import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, type LoginRequest, type SignUpRequest } from '../api/authApi';
import { useAuth } from './useAuth';

type AuthStatus = {
    isLoading: boolean;
    error: string | null;
};

export function useAuthActions() {
    const navigate = useNavigate();
    const { setSession } = useAuth();

    const [status, setStatus] = useState<AuthStatus>({ isLoading: false, error: null });

    const login = useCallback(
        async (req: LoginRequest) => {
            setStatus({ isLoading: true, error: null });
            try {
                const result = await authApi.login(req);

                setSession({
                    accessToken: result.accessToken,
                    user: {
                        userId: result.userId,
                        email: result.email,
                        role: result.role,
                    },
                });

                navigate('/home', { replace: true });
            } catch (e) {
                setStatus({ isLoading: false, error: e instanceof Error ? e.message : 'Unknown error' });
                return;
            }
            setStatus({ isLoading: false, error: null });
        },
        [navigate, setSession],
    );

    const signup = useCallback(
        async (req: SignUpRequest) => {
            setStatus({ isLoading: true, error: null });
            try {
                const result = await authApi.signup(req);

                setSession({
                    accessToken: result.accessToken,
                    user: {
                        userId: result.userId,
                        email: result.email,
                        role: result.role,
                    },
                });

                navigate('/home', { replace: true });
            } catch (e) {
                setStatus({ isLoading: false, error: e instanceof Error ? e.message : 'Unknown error' });
                return;
            }
            setStatus({ isLoading: false, error: null });
        },
        [navigate, setSession],
    );

    return { ...status, login, signup };
}
