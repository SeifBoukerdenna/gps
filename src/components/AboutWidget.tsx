// src/components/AboutWidget.tsx
import React from 'react';
import { Widget } from './Widget.tsx';

export const AboutWidget: React.FC<{
    visible: boolean;
    onClose: () => void;
}> = ({ visible, onClose }) => {
    if (!visible) return null;

    return (
        <Widget
            title="About"
            onClose={onClose}
            className="about-widget"
            defaultPosition={{ x: 20, y: 80 }}
        >
            <div className="widget-content-section">
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
                <div className="feature-highlight">
                    <h3>Features:</h3>
                    <ul>
                        <li>💰 Fuel cost estimation</li>
                        <li>🌙 Dark & light mode</li>
                        <li>🚗 Multiple vehicle profiles</li>
                        <li>🗺️ Interactive map</li>
                        <li>📍 Click on map to set destination</li>
                    </ul>
                </div>
            </div>
        </Widget>
    );
};