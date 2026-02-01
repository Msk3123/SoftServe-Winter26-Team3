
import type { NewsCreate } from "../../../types/news.types";
import type { FieldValidator } from "./FieldValidator";

const newsValidator: FieldValidator<NewsCreate> = (name, value, allValues) => {
    
    switch (name) {
        case "title":
            if (typeof value === 'string' && !value.trim()) return "Required";
        break;
    }

    return undefined;
};

export default newsValidator;