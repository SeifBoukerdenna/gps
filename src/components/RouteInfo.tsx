// src/components/RouteInfo.tsx
import React from 'react';
import { Car, RouteInfoType } from '../types/types';
import { Widget } from './Widget.tsx';
import { MapPin, Clock, Droplet, DollarSign } from 'lucide-react';

export const RouteInfo: React.FC<{
    route: RouteInfoType;
    car: Car;
    visible: boolean;
    onClose: () => void;
    alternativeRoutes?: RouteInfoType[];
    selectedRouteIndex?: number;
    onSelectRoute?: (index: number) => void;
}> = ({
    route,
    car,
    visible,
    onClose,
    alternativeRoutes = [],
    selectedRouteIndex = 0,
    onSelectRoute
}) => {
        if (!visible) return null;

        return (
            <Widget
                title="Route Information"
                onClose={onClose}
                className="route-info"
                defaultPosition={{ x: 20, y: window.innerHeight - 220 }}
            >
                <div className="route-details">
                    <div className="info-row">
                        <div className="info-icon">
                            <MapPin size={18} />
                        </div>
                        <div className="info-content">
                            <span className="info-label">Car:</span>
                            <span className="info-value">{car.model}</span>
                        </div>
                    </div>

                    <div className="info-row">
                        <div className="info-icon">
                            <MapPin size={18} />
                        </div>
                        <div className="info-content">
                            <span className="info-label">Distance:</span>
                            <span className="info-value">{(route.distance / 1000).toFixed(1)} km</span>
                        </div>
                    </div>

                    <div className="info-row">
                        <div className="info-icon">
                            <Clock size={18} />
                        </div>
                        <div className="info-content">
                            <span className="info-label">Duration:</span>
                            <span className="info-value">{route.duration}</span>
                        </div>
                    </div>

                    <div className="info-row">
                        <div className="info-icon">
                            <Droplet size={18} />
                        </div>
                        <div className="info-content">
                            <span className="info-label">Fuel Usage:</span>
                            <span className="info-value">
                                {((route.distance / 1000) * (car.fuelConsumption / 100)).toFixed(2)} L
                            </span>
                        </div>
                    </div>

                    <div className="info-row highlight">
                        <div className="info-icon">
                            <DollarSign size={18} />
                        </div>
                        <div className="info-content">
                            <span className="info-label">Estimated Fuel Cost:</span>
                            <span className="info-value">${route.fuelCost.toFixed(2)}</span>
                        </div>
                    </div>

                    {alternativeRoutes.length > 1 && onSelectRoute && (
                        <div className="alternative-routes">
                            <div className="route-buttons-header">Alternative Routes:</div>
                            <div className="route-buttons">
                                {alternativeRoutes.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => onSelectRoute(index)}
                                        className={`route-button ${selectedRouteIndex === index ? 'selected' : ''}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Widget>
        );
    };