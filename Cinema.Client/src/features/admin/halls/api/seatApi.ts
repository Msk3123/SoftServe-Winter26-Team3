import type { SeatStatus } from "../../../../types/sessionSeat.types";

export interface ReserveSeatsDto {
    sessionId: string;
    seatIds: number[];
    status: SeatStatus;
}

export const updateSeatsStatus = async (data: ReserveSeatsDto) => {
    const response = await fetch("/api/SessionSeat/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Failed to update seats status");
    }

    return true;
};