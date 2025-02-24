// src/components/TipBanner.tsx
import React, { useState, useEffect } from 'react';
import { Lightbulb, X } from 'lucide-react';

const tips = [
    "Click on the map to easily set your destination or starting point.",
    "You can save your favorite locations in the settings panel.",
    "Dark mode can help reduce eye strain when navigating at night.",
    "Compare alternative routes to find the most fuel-efficient option.",
    "Use your home address as a default starting point for quicker planning."
];

export const TipBanner: React.FC = () => {
    const [visible, setVisible] = useState(true);
    const [currentTip, setCurrentTip] = useState(0);

    // Auto-rotate tips every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % tips.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    // Hide after dismissing
    const handleDismiss = () => {
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="tip-banner">
            <div className="tip-icon">
                <Lightbulb size={20} />
            </div>
            <p className="tip-text">{tips[currentTip]}</p>
            <button className="tip-close" onClick={handleDismiss}>
                <X size={16} />
            </button>
        </div>
    );
};