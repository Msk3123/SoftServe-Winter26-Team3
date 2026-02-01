
import type { MovieCreate } from "../../../types/movie.types";
import type { FieldValidator } from "./FieldValidator";

const movieValidator: FieldValidator<MovieCreate> = (name, value, allValues) => {
    
    switch (name) {
        case "title":
            if (typeof value === 'string' && !value.trim()) return "Required";
            break;
    }

    return undefined;
};

export default movieValidator;