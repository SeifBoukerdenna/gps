// src/components/ToggleButton.tsx
import React from 'react';

export const ToggleButton: React.FC<{
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    className?: string;
}> = ({ onClick, icon, label, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`toggle-button ${className}`}
            aria-label={label}
        >
            {icon}
        </button>
    );
};