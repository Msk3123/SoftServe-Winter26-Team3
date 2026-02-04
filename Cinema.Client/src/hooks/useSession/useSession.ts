import { useState, useEffect, useMemo, useCallback } from 'react';
import { getAllSessions } from '../../api/sessionApi';
import { SessionFilter, type SessionShort, type SessionQueryParams } from '../../types/session.types';

export const useSession = (movieId?: number | string) => {
    const [sessions, setSession] = useState<SessionShort[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

const fetchSession = useCallback(async (isNextPage = false) => {
    try {
        setLoading(true);
        const currentPage = isNextPage ? page + 1 : 1;
        const currentLimit = 50;

        const params: SessionQueryParams = {
            page: currentPage,
            pageSize: currentLimit,
            sortBy: "sessionDate",
            order: "asc",
            movieId: movieId,
            sessionFilter: SessionFilter.Active
        };

        const response = await getAllSessions(params);

        setSession(prev => isNextPage ? [...prev, ...response.items] : response.items);
        setHasMore(response.items.length === currentLimit);
        
        if (isNextPage) setPage(currentPage);
        setError(null);
    } catch (err) {
        setError('Failed to load schedule');
    } finally {
        setLoading(false);
    }
}, [movieId, page]);
    useEffect(() => {
        setSession([]);
        setPage(1);
        fetchSession(false);
    }, [movieId, fetchSession]);

const groupedSession = useMemo(() => {
    const groups = sessions.reduce((acc, session) => {
        const dateKey = session.sessionDate.split('T')[0];
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(session);
        return acc;
    }, {} as Record<string, SessionShort[]>);

    Object.keys(groups).forEach(date => {
        groups[date].sort((a, b) => {
            return a.sessionTime.localeCompare(b.sessionTime);
        });
    });

    return groups;
}, [sessions]);
    return {
        groupedSession, 
        loading,
        error,
        hasMore,
        loadMore: () => fetchSession(true),
        allSessions: sessions
    };
};