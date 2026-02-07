import type { TicketShort } from "./ticket.types";

export const OrderStatus = {
    Created: "Created",
    Reserved: "Reserved",
    Confirmed: "Confirmed",
    Cancelled: "Cancelled",
    Completed: "Completed",
    Refunded: "Refunded",
} as const;

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export interface OrderShort {
    id: number|string;
    orderDate: string;
    totalAmount: number;
    orderStatuses: OrderStatus;
}

export interface OrderDetails {
    id: number;
    orderDate: string;
    totalAmount: number;
    userId: number;
    sessionId: number;
    orderStatuses: OrderStatus;
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