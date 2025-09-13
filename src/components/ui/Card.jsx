import React from 'react';
import styles from './Card.module.scss';

/**
 * Card Component - Reusable card container
 * @param {string} variant - Card variant: 'default', 'glass', 'outlined', 'dark'
 * @param {string} size - Card size: 'sm', 'md', 'lg'
 * @param {string} spacing - Card spacing: 'none', 'sm', 'md', 'lg', 'xl'
 * @param {boolean} hover - Hover effect
 * @param {boolean} clickable - Clickable card
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Card content
 * @param {Object} props - Additional props
 */
export default function Card({
  variant = 'default',
  size = 'md',
  spacing = 'md',
  hover = false,
  clickable = false,
  className = '',
  children,
  ...props
}) {
  const cardClasses = [
    styles.card,
    styles[variant],
    styles[size],
    styles[`spacing-${spacing}`],
    hover && styles.hover,
    clickable && styles.clickable,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
}
