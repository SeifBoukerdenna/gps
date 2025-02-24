// src/components/LoadingSpinner.tsx
import React from 'react';
import styles from './LoadingSpinner.module.css';

export const LoadingSpinner: React.FC = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingLogo}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                        fill="#805AD5" />
                </svg>
            </div>
            <div className={styles.loadingSpinner}></div>
            <div className={styles.loadingText}>Loading your maps experience...</div>
        </div>
    );
};