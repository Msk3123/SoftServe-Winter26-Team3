
import type { HallCreate } from "../../../types/hall.types";
import type { FieldValidator } from "./FieldValidator";

const hallValidator: FieldValidator<HallCreate> = (name, value, allValues) => {
    
    switch (name) {
        case "hallName":
            if (typeof value === 'string' && !value.trim()) return "Required";
            break;

        case "rows":
        case "seatsPerRow":
            if(typeof value === "number" && !value ) return "Required";
            break;
    }

    return undefined;
};

export default hallValidator;