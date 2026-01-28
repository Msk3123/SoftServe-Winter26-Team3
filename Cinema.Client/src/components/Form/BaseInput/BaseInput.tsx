import type { ComponentProps, ChangeEvent } from "react";
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e);
        if (onValueChange) onValueChange(e.target.value);
    };

    return (
        <div className={`${styles.wrapper} ${className || ""}`}>
            {label && <label className={styles.label}>{label}</label>}
            <input
                className={`${styles.input} ${error ? styles.error : ""}`}
                value={value}
                onChange={handleChange}
                type={type}
                {...props}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

export default BaseInput;