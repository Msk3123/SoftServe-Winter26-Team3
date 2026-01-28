export const baseUrl = import.meta.env.VITE_API_URL ?? 'https://localhost:7249';

export const api = {
    buildUrl: (path: string) => `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`,
};
