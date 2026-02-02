import type { ActorCreate } from "../../../types/actor.types";
import type { FieldValidator } from "./FieldValidator";

const actorValidator: FieldValidator<ActorCreate> = (name, value, allValues) => {
    
    switch (name) {
        case "firstName":
            if (typeof value === 'string' && !value.trim()) return "Required";
        break;
        
        case "photoUrl":
            if (typeof value === 'string' && value && !value.startsWith("http"))
                return "Invalid URL";
        break;
        
        case "biography":
            if (typeof value === 'string' && value.trim().length < 200 )
                return "Biography must be at least 200 characters";
        break;

        case "birthday":
            if(new Date(value).valueOf() > Date.now()) return "Birthday can`t be in the future"
        break;
    }

    return undefined;
};

export default actorValidator;