import React from 'react';
import styles from './Container.module.scss';

/**
 * Container Component - Layout container with background effects
 * @param {string} variant - Container variant: 'default', 'glass', 'gradient'
 * @param {string} size - Container size: 'sm', 'md', 'lg', 'xl'
 * @param {boolean} fullHeight - Full height container
 * @param {boolean} centered - Centered content
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Container content
 * @param {Object} props - Additional props
 */
export default function Container({
  variant = 'default',
  size = 'lg',
  fullHeight = false,
  centered = false,
  className = '',
  children,
  ...props
}) {
  const containerClasses = [
    styles.container,
    styles[variant],
    styles[size],
    fullHeight && styles.fullHeight,
    centered && styles.centered,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
}
