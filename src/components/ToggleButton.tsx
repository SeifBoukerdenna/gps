// src/components/ToggleButton.tsx
import React from 'react';

export const ToggleButton: React.FC<{
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
}> = ({ onClick, icon, label }) => {
    return (
        <button
            onClick={onClick}
            className="toggle-button"
            aria-label={label}
        >
            {icon}
        </button>
    );
};