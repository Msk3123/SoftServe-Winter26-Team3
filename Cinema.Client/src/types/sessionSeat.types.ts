import type { SeatType } from "./seatType.types";

export const SeatStatus = {
    Available: "Available",
    Reserved: "Reserved",
    Sold: "Sold",
    Blocked: "Blocked",
} as const;

export type SeatStatus = typeof SeatStatus[keyof typeof SeatStatus];

export interface SessionSeat {
    id: number;
    row: number;
    number: number;
    price: number;
    status: SeatStatus | string; 
    type: SeatType;
}

export interface SessionExtended {
    id: number;
    sessionDate: string;
    sessionTime: string;
    movie: {
        id: number;
        title: string;
        posterUrl: string;
        releaseDate: string;
    };
    hall: {
        id: number;
        hallName: string;
        capacity: number;
    };
    seats: SessionSeat[];
}