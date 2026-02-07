import type { UserCreate } from "../../../types/user.types";
import type { FieldValidator } from "./FieldValidator";
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const DIGIT_REGEX = /[0-9]/;
const PHONE_REGEX = /^\+[1-9]\d{6,14}$/;

const userValidator: FieldValidator<UserCreate> = (name, value, allValues) => {

    const strValue = typeof value === 'string' ? value : "";
    const trimmed = strValue.trim();

    switch (name) {
        case "firstName":
            if (!trimmed)
                return "First name is required";
            if (trimmed.length > 50)
                return "First name cannot exceed 50 characters";
            break;

        case "email":
            if (!trimmed)
                return "Email is required";
            if (!EMAIL_REGEX.test(trimmed))
                return "Invalid email format";
            break;

        case "password":
            if (!strValue)
                return "Password is required";

            if (strValue.length < 8)
                return "Password must be at least 8 characters long";

            if (strValue.toLowerCase() === strValue)
                return "Password must contain at least one uppercase letter";
            
            if (!DIGIT_REGEX.test(strValue))
                return "Password must contain at least one digit";
            break;

        case "phone":
            if (!trimmed)
                return "Phone number is required";
            if (!PHONE_REGEX.test(trimmed))
                return "Phone must be in international format (e.g., +1234567890)";
            break;
        
        case "roleId":
            if (!value || Number(value) < 1)
                return "A valid RoleId is required";
            break;
    }

    return undefined;
};

export default userValidator;
