import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  children: string;
  color?: string;
  textColor?: string;
  size?: "lg" | "md" | "sm";
  border?: boolean;
}

const Badge = ({ 
  children, 
  color, 
  textColor, 
  size = "md", 
  border = true 
}:BadgeProps) => {


  const hasCustomColors = color ||textColor;


  const className = [
    styles.badge,
    styles[size], 
    !hasCustomColors ? styles.defaultColors : ''
  ].join(' ');

  const borderColor = border 
    ? (textColor || 'currentColor') 
    : (color || 'transparent');

  return (
    <div
      className={className}
      style={{
        backgroundColor: color,
        color: textColor,
        borderColor: borderColor,
      }}
    >
      {children}
    </div>
  );
};

export default Badge;