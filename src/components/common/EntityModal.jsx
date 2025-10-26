import React from 'react';
import { Card, Button, Typography } from '../ui';
import styles from './EntityModal.module.scss';

export default function EntityModal({
  title,
  subtitle,
  children,
  onCancel,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmDisabled = false,
  width = 600,
}) {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <Card 
        variant="glass" 
        spacing="lg" 
        className={styles.modal}
        style={{ width: `${width}px`, maxWidth: '90vw' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.header}>
          <div>
            <Typography variant="h2" color="primary" style={{ marginBottom: '0.5rem' }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body" color="gray">
                {subtitle}
              </Typography>
            )}
          </div>
          <Button variant="secondary" size="sm" onClick={onCancel}>
            ✕
          </Button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {children}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button variant="secondary" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button 
            variant="primary" 
            onClick={onConfirm}
            disabled={confirmDisabled}
          >
            {confirmText}
          </Button>
        </div>
      </Card>
    </div>
  );
}
