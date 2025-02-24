// src/components/RouteInfo.tsx
import React from 'react';
import { X } from 'lucide-react';
import { Car, RouteInfoType } from '../types/types';

export const RouteInfo: React.FC<{
    route: RouteInfoType;
    car: Car;
    visible: boolean;
    onClose: () => void;
}> = ({ route, car, visible, onClose }) => {
    if (!visible) return null;

    return (
        <div className="widget route-info">
            <div className="widget-header">
                <h2 className="widget-title">Route Information</h2>
                <button onClick={onClose} className="close-button">
                    <X size={24} />
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p>Car: {car.model}</p>
                <p>Distance: {(route.distance / 1000).toFixed(1)} km</p>
                <p>Duration: {route.duration}</p>
                <p>Estimated Fuel Cost: ${route.fuelCost.toFixed(2)}</p>
            </div>
        </div>
    );
};