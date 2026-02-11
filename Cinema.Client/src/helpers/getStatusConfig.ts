import { OrderStatus } from "../types/order.types";

export const getStatusConfig = (statusValue: string) => {
    switch (statusValue) {
        case OrderStatus.Created:
            return { label: "Created", color: "var(--color-primary)", textColor: "#e2e8f0" };
            
        case OrderStatus.Reserved:
            return { label: "Reserved", color: "#d97706", textColor: "#fef3c7" };
            
        case OrderStatus.Confirmed:
            return { label: "Confirmed", color: "var(--button-save)", textColor: "#dbeafe" };
            
        case OrderStatus.Completed:
            return { label: "Completed", color: "var(--card-active)", textColor: "#dcfce7" };
            
        case OrderStatus.Cancelled:
            return { label: "Cancelled", color: "var(--color-danger)", textColor: "#fee2e2" };
            
        case OrderStatus.Refunded:
            return { label: "Refunded", color: "#9333ea", textColor: "#f3e8ff" };
            
        default:
            return { label: "Unknown", color: "#64748b", textColor: "#f1f5f9" };
    }
};