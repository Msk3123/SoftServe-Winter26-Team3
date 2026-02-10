
import { postItem } from "../../../../api/api";

export interface TicketSelectionDto {
    sessionSeatId: number;
    ticketTypeId: number;
}

export interface OrderCreateDto {
    userId: number;
    sessionId: number;
    selectedTickets: TicketSelectionDto[];
}

// Інтерфейс відповіді від сервера (додай поля, які повертає твій бекенд)
export interface OrderResponse {
    id: number;
    userId: number;
    totalAmount: number;
    status: string;
}

export const createOrder = async (orderData: OrderCreateDto): Promise<OrderResponse> => {
    // Використовуємо наш postItem, який сам додасть Headers і зробить JSON.stringify
    // "Order" — це шлях (path) до твого контролера
    const response = await postItem<OrderCreateDto, OrderResponse>("Order", orderData);
    
    // Оскільки handleResponse в apiClient вже повертає дані або кидає помилку,
    // тут ми просто повертаємо результат. 
    // Якщо твій postItem повертає SingleResponse { data: T }, беремо .data
    return (response as any).data || response;
};