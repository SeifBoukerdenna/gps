// src/components/AboutWidget.tsx
import React from 'react';
import { X } from 'lucide-react';

export const AboutWidget: React.FC<{
    visible: boolean;
    onClose: () => void;
}> = ({ visible, onClose }) => {
    if (!visible) return null;

    return (
        <div className="widget about-widget">
            <div className="widget-header">
                <h2 className="widget-title">About</h2>
                <button onClick={onClose} className="close-button">
                    <X size={24} />
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p>
                    Welcome to our modern GPS application! This app helps you plan your routes
                    while considering your vehicle's fuel consumption and current gas prices.
                </p>
                <p>
                    Key features include real-time route calculation, fuel cost estimation,
                    multiple route options, customizable car settings, favorite locations,
                    and dark/light mode support.
                </p>
                <p>
                    Simply enter your destination in the search bar, and we'll calculate the
                    best route for you based on your preferences.
                </p>
            </div>
        </div>
    );
};