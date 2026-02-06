import { useState, useEffect } from 'react';
import { getActor } from '../../api/actorApi'; 
import type { Actor } from '../../types/actor.types';

export const useActor = (id: string | undefined) => {
    const [actor, setActor] = useState<Actor | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setIsLoading(false);
            return;
        }

        const fetchActor = async () => {
            try {
                setIsLoading(true);
                const data = await getActor(id);
                setActor(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load actor details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchActor();
    }, [id]);

    return { actor, isLoading, error };
};