import type { CreateSessionsBatch } from "../../../types/session.types";
import type { FieldValidator } from "./FieldValidator";

const sessionValidator: FieldValidator<CreateSessionsBatch> = (name, value, allValues) => {
    switch (name) {
        case "movieId":
            if (!value || value === 0) return "Movie is required";
            break;

        case "hallId":
            if (!value || value === 0) return "Hall is required";
            break;

        case "startDate":
            if (!value) return "Start date is required";
            break;

        case "endDate":
            if (!value) return "End date is required";
            
            if (allValues.startDate && new Date(value as string) < new Date(allValues.startDate)) {
                return "End date cannot be earlier than start date";
            }
            break;

        case "dailySchedule":{
            const schedule = value as string[];
            if (!schedule || schedule.length === 0) {
                return "Add at least one time slot";
            }
            break;
        }

        case "weekDays":{
            const days = value as number[];
            if (!days || days.length === 0) {
                return "Select at least one day of the week";
            }
            break;
        }

        default:
            return undefined;
    }
    return undefined;
}

export default sessionValidator;