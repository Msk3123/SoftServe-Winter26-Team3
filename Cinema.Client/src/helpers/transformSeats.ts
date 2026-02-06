

const transformSeats = <T extends { row: number }>(seats: T[]): T[][] => {
    const grouped = seats.reduce<Record<number, T[]>>((acc, seat) => {
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