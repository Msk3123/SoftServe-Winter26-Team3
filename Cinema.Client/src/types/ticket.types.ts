export interface TicketShort{
    id: number|string;
    row: number;
    seatNo: number;
    orderId: number;
    sessionSeatId: number;
    ticketTypeName: string;
    price: number;
}

export interface TicketDetails {
    id: number|string;

    movieTitle: string;
    showtime: string;
    hallName: string;

    seatTypeName: string;

    row: number;
    seatNo: number;

    ticketTypeName: string;
    price: number;
}