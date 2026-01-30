import type { ComponentProps, ChangeEvent } from "react";
import styles from "./TextArea.module.css";

interface TextAreaProps extends Omit<ComponentProps<"textarea">, "onChange"> {
    label?: string;
    error?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onValueChange?: (value: string) => void;
}

const TextArea = ({
    label,
    error,
    value,
    onChange,
    onValueChange,
    className,
    rows = 6,
    ...props
}: TextAreaProps) => {

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) onChange(e);
        if (onValueChange) onValueChange(e.target.value);
    };

    return (
        <div className={`${styles.wrapper} ${className || ""}`}>
            {label && <label className={styles.label}>{label}</label>}
            <textarea
                className={`${styles.textarea} ${error ? styles.error : ""}`}
                value={value}
                onChange={handleChange}
                rows={rows}
                {...props}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

export default TextArea;