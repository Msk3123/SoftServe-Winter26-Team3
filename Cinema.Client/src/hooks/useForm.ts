import { useCallback, useState } from "react";

const useForm= <T extends object>(
    initialState: T,
    validateField: (name: keyof T, value: T[keyof T], values: T) => string | undefined
)=>{
    const [formData,setFormData] = useState<T>(initialState);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = <K extends keyof T>(name: K, value: T[K]) => {

        const newValues = { ...formData, [name]: value };
        setFormData(newValues);

        const fieldError = validateField(name, value, newValues);
        setErrors(prev => ({ ...prev, [name]: fieldError }));
    };
    
    const setAllValues = useCallback((newValues: T) => {
        setFormData(newValues);
    }, []);

    const validateAll = ()=>{
        
        const allErrors: Partial<Record<keyof T, string>> = {};
    
        (Object.keys(formData) as Array<keyof T>).forEach(key => {
            const error = validateField(key, formData[key], formData);
            if (error) allErrors[key] = error;
        });

        setErrors(allErrors);
        return allErrors;
    }

    const handleSubmit = async (onSubmit: (data: T) => void) => {
        setIsSubmitting(true);

        const allErrors = validateAll();

        if (Object.keys(allErrors).length === 0) {
            onSubmit(formData);
        }else{
            setErrors(allErrors);
        }

        setIsSubmitting(false);
    } ;

    return {formData,errors,isSubmitting,handleChange,setAllValues,handleSubmit};
};

export default useForm;