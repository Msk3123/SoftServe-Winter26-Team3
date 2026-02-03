import type { SessionCreate } from "../../../types/session.types";
import type { FieldValidator } from "./FieldValidator";

const singleSessionValidator: FieldValidator<SessionCreate> = (name, value, allValues) => {
    switch (name) {
        case "movieId":
            if (!value || value === 0) return "Movie is required";
            break;

        case "hallId":
            if (!value || value === 0) return "Hall is required";
            break;

        case "sessionDate": {
            if (!value) return "Date is required";
            
            const selectedDate = new Date(value as string);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                return "Cannot create sessions in the past";
            }
            break;
        }

        case "sessionTime":
            if (!value) return "Time is required";
            break;
        default:
            return undefined;
    }
    return undefined;
}

export default singleSessionValidator;