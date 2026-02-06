import { useEffect, useState, useCallback, useMemo } from "react";
import type { SessionExtended, SessionSeat } from "../../types/sessionSeat.types";
import { getSession, getSessionExtended } from "../../api/sessionApi";
import transformSeats from "../../helpers/transformSeats";
import type { ApiError } from "../../types/api.types";
import toast from "react-hot-toast";


const useSessionHallMap = (sessionId: number | string) => {
    const [sessionData, setSessionData] = useState<SessionExtended | null>(null);
    const [seats, setSeats] = useState<SessionSeat[][]>([]);
    const [selectedSeats, setSelectedSeats] = useState<SessionSeat[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await getSessionExtended(sessionId);
                console.log(data)
                setSessionData(data);
                setSeats(transformSeats(data.seats));
            } catch (e) {
                const err = e as ApiError;
                setError(err.message || "Failed to load the hall map. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        if (sessionId) fetchData();
    }, [sessionId]);

    const toggleSeat = useCallback((seat: SessionSeat) => {
        if (seat.status !== "Available") return;

        setSelectedSeats((prev) => {
            const isSelected = prev.some((s) => s.id === seat.id);
            if (isSelected) {
                return prev.filter((s) => s.id !== seat.id);
            }
            if (prev.length >= 6) {
                toast("Maximum 6 tickets per order allowed");
                return prev;
            }
            return [...prev, seat];
        });
    }, []);

    const totalPrice = useMemo(() => 
        selectedSeats.reduce((sum, seat) => sum + seat.price, 0), 
    [selectedSeats]);

    const clearSelection = () => setSelectedSeats([]);

    return {
        sessionData,
        seats,
        selectedSeats,
        totalPrice,
        isLoading,
        error,
        toggleSeat,
        clearSelection
    };
};

export default useSessionHallMap;