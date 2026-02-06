import type { SeatTypeCreate } from "../../../types/seatType.types";
import type { FieldValidator } from "./FieldValidator";

const seatTypeValidator: FieldValidator<SeatTypeCreate> = (name, value) => {
    const forbidden = /^\s*newtype\s*$/i;
    
    switch (name) {
        case "name":
            if (typeof value === 'string' && !value.trim()) return "Required";
            if (typeof value === 'string' && forbidden.test(value)) return "Required";
            break;

        case "basePrice":
            if(!value) return "Required";
            if(typeof value === 'number' && value<30) return "The price is to low";
    }

    return undefined;
};

export default seatTypeValidator;