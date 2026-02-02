import React, { useId, type ComponentProps } from 'react';
import styles from "./Select.module.css"

interface Option {
    value: string | number;
    label: string;
}

interface SelectProps extends Omit<ComponentProps<"select">, "onChange">  {
    label?: string;
    options: Option[];
    value: string | number;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    error?:string
}

const Select: React.FC<SelectProps> = ({
    label,
    options,
    value,
    onChange,
    placeholder,
    className = "",
    error,
    ...props
}) => {

    const id = useId();
    return (
        <div className={`${styles.formGroup} ${className}`}>
            {label && <label htmlFor={id} className={styles.label}>{label}</label>}
            <div className={styles.selectWrapper}>
                <select
                    id={id}
                    className={styles.selectField}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    {...props}
                >
                    {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    )}
                    
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            { error && <span className={styles.error}>{error}</span>}
        </div>
  );
};

export default Select;