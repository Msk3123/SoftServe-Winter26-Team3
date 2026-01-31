import { type ComponentProps, type ChangeEvent, useId } from "react";
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

    const id = useId();
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) onChange(e);
        if (onValueChange) onValueChange(e.target.value);
    };

    return (
        <div className={`${styles.wrapper} ${className || ""}`}>
            {label && <label htmlFor={id} className={styles.label}>{label}</label>}
            <textarea
                className={`${styles.textarea} ${error ? styles.error : ""}`}
                value={value}
                onChange={handleChange}
                rows={rows}
                id={id}
                {...props}
            />
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};

export default TextArea;