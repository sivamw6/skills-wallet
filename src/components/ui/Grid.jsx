import React from 'react';
import styles from './Grid.module.scss';

/**
 * Grid Component - Flexible grid layout
 * @param {number} columns - Number of columns: 1, 2, 3, 4, 6, 12
 * @param {string} gap - Gap size: 'sm', 'md', 'lg'
 * @param {boolean} responsive - Responsive grid
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Grid content
 * @param {Object} props - Additional props
 */
export default function Grid({
  columns = 3,
  gap = 'md',
  responsive = true,
  className = '',
  children,
  ...props
}) {
  const gridClasses = [
    styles.grid,
    styles[`cols${columns}`],
    styles[`gap${gap}`],
    responsive && styles.responsive,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={gridClasses} {...props}>
      {children}
    </div>
  );
}
