// src/components/RouteInfo.tsx
import React from 'react';
import { CarType, RouteInfoType } from '../types/types';
import { Widget } from './Widget.tsx';
import { Droplet, DollarSign, Navigation, ChevronRight, Car, } from 'lucide-react';

export const RouteInfo: React.FC<{
    route: RouteInfoType;
    car: CarType;
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

        const formatDuration = (duration: string) => {
            // Make it more readable by replacing text
            return duration.replace('hours', 'hrs').replace('hour', 'hr');
        };

        return (
            <Widget
                title="Route Information"
                onClose={onClose}
                className="route-info"
                defaultPosition={{ x: 20, y: 170 }}
            >
                <div className="route-details">
                    <div className="route-header">
                        <div className="route-summary">
                            <div className="route-distance">{(route.distance / 1000).toFixed(1)} km</div>
                            <div className="route-duration">{formatDuration(route.duration)}</div>
                        </div>
                    </div>

                    <div className="info-section">
                        <div className="info-row">
                            <div className="info-icon car">
                                <Car size={18} />
                            </div>
                            <div className="info-content">
                                <span className="info-value">{car.model}</span>
                            </div>
                        </div>

                        <div className="info-row with-divider">
                            <div className="info-icon fuel">
                                <Droplet size={18} />
                            </div>
                            <div className="info-content">
                                <span className="info-label">Fuel Usage</span>
                                <span className="info-value">
                                    {((route.distance / 1000) * (car.fuelConsumption / 100)).toFixed(2)} L
                                </span>
                            </div>
                        </div>

                        <div className="info-row cost">
                            <div className="info-icon">
                                <DollarSign size={18} />
                            </div>
                            <div className="info-content">
                                <span className="info-label">Estimated Cost</span>
                                <span className="info-value cost-value">${route.fuelCost.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {alternativeRoutes.length > 1 && onSelectRoute && (
                        <div className="alternative-routes">
                            <div className="route-buttons-header">
                                <Navigation size={16} style={{ marginRight: '8px' }} />
                                Alternative Routes
                            </div>
                            <div className="route-cards">
                                {alternativeRoutes.map((altRoute, index) => (
                                    <div
                                        key={index}
                                        className={`route-card ${selectedRouteIndex === index ? 'selected' : ''}`}
                                        onClick={() => onSelectRoute(index)}
                                    >
                                        <div className="route-number">{index + 1}</div>
                                        <div className="route-card-details">
                                            <div className="route-card-distance">{(altRoute.distance / 1000).toFixed(1)} km</div>
                                            <div className="route-card-duration">{formatDuration(altRoute.duration)}</div>
                                        </div>
                                        <ChevronRight size={16} className="route-card-icon" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Widget>
        );
    };