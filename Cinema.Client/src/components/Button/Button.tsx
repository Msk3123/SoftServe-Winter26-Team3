import React from 'react';
import styles from './Button.module.css';
import { NavLink } from 'react-router';

interface ButtonProps {
    children: React.ReactNode;
    variant?: "fill" | "outline" | "text-only";
    action?: (() => void) | ((e: React.MouseEvent<HTMLElement>) => void);
    color?: string;
    bgColor?: string;
    className?: string;
    borderColor?: string;
    htmlType?: 'button' | 'submit' | 'reset';
    to?: string;
    disabled?:boolean;
}

const Button = ({
    children,
    variant = "fill",
    action,
    color = "var(--text-main)",
    bgColor = "var(--color-primary)",
    className = "",
    borderColor,
    htmlType = 'button',
    to,
    disabled = false,
}:ButtonProps) => {

    let variantClass = styles.fill;

    switch (variant) {
        case "outline":
            variantClass = styles.outline;
            break;
        case "text-only":
            variantClass = styles.textOnly;
            break;
        case "fill":
        default:
            variantClass = styles.fill;
            break;
    }

    const dynamicStyles: React.CSSProperties = {
        color: color,
    };

    if (variant === 'fill') {
        dynamicStyles.backgroundColor = bgColor;
    }
    
    if (variant === 'outline' || variant === 'fill') {
        dynamicStyles.borderColor = borderColor ?? (variant === 'outline' ? color : 'transparent');
    }

    const combinedClasses = `${styles.button} ${variantClass} ${className}`;

    if (to) {
        return (
            <NavLink
                to={to}
                className={combinedClasses}
                style={dynamicStyles}
                onClick={action}
            >
                {children}
            </NavLink>
        );
    }

    return (
        <button
            type={htmlType}
            onClick={action}
            className={combinedClasses}
            style={dynamicStyles}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;