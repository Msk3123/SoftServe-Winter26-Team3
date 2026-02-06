import type { TicketShort } from "./ticket.types";

export const OrderStatus = {
    Created: 0,
    Reserved: 1,
    Confirmed: 2,
    Cancelled: 3,
    Completed: 4,
    Refunded: 5,
} as const;

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export interface OrderShort {
    id: number|string;
    orderDate: string;
    totalAmount: number;
    orderStatus: OrderStatus;
}

export interface OrderDetails {
    id: number;
    orderDate: string;
    totalAmount: number;
    userId: number;
    sessionId: number;
    orderStatus: OrderStatus;
    tickets: TicketShort[];
}

export interface OrderCreate {
    userId: number;
    sessionId: number;
    selectedTickets: TicketSelection[];
}

export interface TicketSelection {
    sessionSeatId: number;
    ticketTypeId: number;
}