import React, { useId } from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    error?: string;
    disabled?:boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange,error,disabled=false}) => {
    const id = useId();
    return (
    <div className={styles.container} aria-disabled={disabled}>
        <input
            type="checkbox"
            id={id}
            className={styles.realCheckbox}
            checked={checked}
            onChange={(e) => !disabled && onChange(e.target.checked)}
            disabled={disabled}
        />

        <label htmlFor={id} className={styles.checkboxLabel}>
            <span className={styles.customCheckbox}>
                {checked && (
                    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                )}
            </span>
            <span>{label}</span>
        </label>
        { error && <span className={styles.error}>{error}</span>}
    </div>
    );
};