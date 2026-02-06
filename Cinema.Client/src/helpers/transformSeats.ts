import type { SeatShort } from "../types/seat.types";

const transformSeats = (seats: SeatShort[]): Array<SeatShort[]> => {
    const grouped = seats.reduce<Record<number, SeatShort[]>>((acc, seat) => {
        const row = seat.row;

        if (!acc[row]) {
            acc[row] = [];
        }

        acc[row].push(seat);

        return acc;
    }, {});

    return Object.values(grouped);
};

export default transformSeats;