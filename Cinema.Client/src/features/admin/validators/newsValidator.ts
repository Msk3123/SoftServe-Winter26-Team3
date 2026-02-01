
import type { NewsCreate } from "../../../types/news.types";
import type { FieldValidator } from "./FieldValidator";

const newsValidator: FieldValidator<NewsCreate> = (name, value, allValues) => {
    
    switch (name) {
        case "title":
            if (typeof value === 'string' && !value.trim()) return "Required";
            break;
        
            case "newsContent":
            if (typeof value === 'string' && value.trim().length < 100) {
                return "Content must be at least 100 characters";
            }
            break;

        case "imageUrl":
            if (typeof value === 'string' && !value.trim()) return "Image URL is required";
            break;

        case "publishedDate":
            if (!value) return "Date is required";
            break;
        
        case "tagId":
            if (value === undefined || value === null || value === "") return "Tag is required";
            break;
        
        case "isActive":
            if(value && new Date(allValues.publishedDate).valueOf() > Date.now()) return "Future News can`t be active"
    }

    return undefined;
};

export default newsValidator;