const TOKEN_KEY = 'cinema.accessToken';

export const authStorage = {
    getToken: (): string | null => localStorage.getItem(TOKEN_KEY),
    setToken: (token: string): void => {
        localStorage.setItem(TOKEN_KEY, token);
    },
    clear: (): void => {
        localStorage.removeItem(TOKEN_KEY);
    },
};
