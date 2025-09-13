import React from 'react';
import styles from './Typography.module.scss';

/**
 * Typography Component - Reusable text components
 * @param {string} variant - Typography variant: 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'caption'
 * @param {string} color - Text color: 'primary', 'secondary', 'success', 'warning', 'error', 'white'
 * @param {boolean} gradient - Gradient text effect
 * @param {boolean} centered - Centered text
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Text content
 * @param {Object} props - Additional props
 */
export default function Typography({
  variant = 'body',
  color = 'primary',
  gradient = false,
  centered = false,
  className = '',
  children,
  ...props
}) {
  const Component = variant.startsWith('h') ? variant : 'p';
  
  const typographyClasses = [
    styles[variant],
    styles[color],
    gradient && styles.gradient,
    centered && styles.centered,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={typographyClasses} {...props}>
      {children}
    </Component>
  );
}
