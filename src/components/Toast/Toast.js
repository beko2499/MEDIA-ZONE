"use client";

import { useEffect } from 'react';
import { useToast } from '@/context/ToastContext';
import styles from './Toast.module.css';

const Toast = () => {
    const { toasts, removeToast } = useToast();

    return (
        <div className={styles.toastContainer}>
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className={`${styles.toast} ${styles[toast.type]}`}
                    onClick={() => removeToast(toast.id)}
                >
                    <div className={styles.toastIcon}>
                        {toast.type === 'success' && '✓'}
                        {toast.type === 'error' && '✕'}
                        {toast.type === 'warning' && '⚠'}
                        {toast.type === 'info' && 'ℹ'}
                    </div>
                    <div className={styles.toastMessage}>{toast.message}</div>
                    <button
                        className={styles.toastClose}
                        onClick={(e) => {
                            e.stopPropagation();
                            removeToast(toast.id);
                        }}
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Toast;
