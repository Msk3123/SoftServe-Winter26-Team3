
import type { MovieCreate } from "../../../types/movie.types";
import type { FieldValidator } from "./FieldValidator";

const movieValidator: FieldValidator<MovieCreate> = (name, value, allValues) => {
    const stringValue = String(value || "").trim();

    switch (name) {
        case "title":
            if (!stringValue) return "Required";
            break;

        case "duration":
            if (!value) return "Required";
            if (isNaN(Number(value)) || Number(value) <= 0) return "Must be a positive number";
            break;
        
        case "rating":{
            if (value === undefined || value === null || value === "") return "Required";
            const rating = Number(value);
            if (isNaN(rating) || rating < 0 || rating > 10) return "Rating must be between 0 and 10";
            break;
        }
        case "description":
            if (stringValue.length < 100) return "Description must be at least 100 characters";
            break;

        case "language":
            if (!stringValue) return "Required";
            if (stringValue.length !== 2) return "Use ISO 2-letter code (e.g., 'en')";
            break;
        
        case "posterUrl":
        case "trailerUrl":
            if (!stringValue) return "URL is required";
            if (!stringValue.startsWith("http")) return "Invalid URL format";
            break;
        
        case "genreIds":
            if (!Array.isArray(value) || value.length < 1) return "At least 1 genre required";
            break;
        
        case "releaseDate":
        case "startDate":
        case "endDate":{
            if (!value) return "Date is required";
            const date = new Date(String(value));
            if (isNaN(date.getTime())) return "Invalid date format";

            if (name === "endDate" && allValues.startDate) {
                if (new Date(String(value)) < new Date(String(allValues.startDate))) {
                    return "End date cannot be before start date";
                }
            }
            break;
        }
    }

    return undefined;
};

export default movieValidator;