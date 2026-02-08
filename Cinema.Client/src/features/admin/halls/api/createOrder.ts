
export interface TicketSelectionDto {
    sessionSeatId: number;
    ticketTypeId: number;
}

export interface OrderCreateDto {
    userId: number;
    sessionId: number;
    selectedTickets: TicketSelectionDto[];
}

export const createOrder = async (orderData: OrderCreateDto) => {
    const response = await fetch("/api/Order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
    });
    
    if (!response.ok) throw new Error("Failed to create order");
    return response.json(); 
};