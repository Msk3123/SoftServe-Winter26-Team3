import { type ComponentProps, type ChangeEvent, useId } from "react";
import styles from "./BaseInput.module.css";

interface BaseInputProps extends Omit<ComponentProps<"input">, "onChange"> {
    label?: string;
    error?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onValueChange?: (value: string) => void;
}

const BaseInput = ({
    label,
    error,
    value,
    onChange,
    onValueChange,
    className,
    type = "text",
    ...props
}: BaseInputProps) => {

    const id = useId();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e);
        if (onValueChange) onValueChange(e.target.value);
    };

    return (
        <div className={`${styles.wrapper} ${className || ""}`}>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                className={`${styles.input} ${error ? styles.error : ""}`}
                value={value}
                onChange={handleChange}
                type={type}
                id={id}
                {...props}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

export default BaseInput;