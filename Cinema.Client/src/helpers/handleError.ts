import { toast } from 'react-hot-toast';
import { ApiError } from '../types/api.types';

export const handleError = (error: unknown, altMessage:string="Unexpected error") => {
    // Безпечне приведення типів
    const message = error instanceof Error
        ? error.message 
        : (error as ApiError)?.message || altMessage;

    toast.error(message);
    
    console.error("[API Error]:", error);
};
