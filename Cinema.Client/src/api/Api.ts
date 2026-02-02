export const baseUrl = import.meta.env.VITE_API_URL ?? 'https://localhost:7249';

export const api = {
    buildUrl: (path: string) => `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`,
};

export async function postJson<TResponse>(url: string, body: unknown): Promise<TResponse> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        // Підтримуємо помилки у форматі { message: "..." } та звичайний текст.
        const contentType = response.headers.get('content-type') ?? '';

        if (contentType.includes('application/json')) {
            try {
                const data = (await response.json()) as { message?: string };
                throw new Error(data.message ?? `HTTP ${response.status}`);
            } catch {
                throw new Error(`HTTP ${response.status}`);
            }
        }

        const text = await response.text();
        throw new Error(text || `HTTP ${response.status}`);
    }

    return response.json() as Promise<TResponse>;
}
