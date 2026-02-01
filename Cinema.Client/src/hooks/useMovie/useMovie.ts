import { useState, useEffect } from 'react';
import { getMovie } from "../../api/movieApi";
import type { Movie } from '../../types/movie.types';

export const useMovie = (id: string | undefined | number) => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchMovie = async () => {
            try {
                setIsLoading(true);
                const data = await getMovie(id);
                setMovie(data);
            } catch (err) {
                setError('Failed to load movie details');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    return { movie, isLoading, error };
};