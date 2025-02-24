// src/components/RouteInfo.tsx
import React from 'react';
import { CarType, RouteInfoType } from '../types/types';
import { Widget } from './Widget.tsx';
import {
    MapPin,
    Droplet,
    DollarSign,
    Navigation,
    ChevronRight,
    Leaf,
    ToggleLeft,
    ToggleRight
} from 'lucide-react';
import EmissionsInfo from './EmissionsInfo';
import EmissionsComparison from './EmissionsComparison';
import './EmissionsInfo.css';

interface RouteInfoProps {
    route: RouteInfoType;
    car: CarType;
    visible: boolean;
    onClose: () => void;
    alternativeRoutes?: RouteInfoType[];
    selectedRouteIndex?: number;
    onSelectRoute?: (index: number) => void;
    showEmissions?: boolean;
    toggleEmissions?: () => void;
}

export const RouteInfo: React.FC<RouteInfoProps> = ({
    route,
    car,
    visible,
    onClose,
    alternativeRoutes = [],
    selectedRouteIndex = 0,
    onSelectRoute,
    showEmissions = true,
    toggleEmissions
}) => {
    if (!visible) return null;

    const formatDuration = (duration: string) => {
        // Quick replacement to abbreviate "hours" or "hour"
        return duration.replace('hours', 'hrs').replace('hour', 'hr');
    };

    // Check if car is electric
    const isElectric = car.fuelType === 'electric';
    // Adjust label and unit accordingly
    const usageLabel = isElectric ? 'Electricity Usage' : 'Fuel Usage';
    const usageUnit = isElectric ? 'kWh' : 'L';

    // Calculate the "usage" for display
    const usageAmount = (
        (route.distance / 1000) *
        (car.fuelConsumption / 100)
    ).toFixed(2);

    // If there are multiple routes, let's identify the "best" route for distance and emissions
    let shortestRouteIndex: number | null = null;
    let greenestRouteIndex: number | null = null;

    if (alternativeRoutes.length > 1) {
        // Sort by distance
        const sortedByDistance = [...alternativeRoutes].sort(
            (a, b) => a.distance - b.distance
        );
        shortestRouteIndex = alternativeRoutes.findIndex(
            (r) => r.distance === sortedByDistance[0].distance
        );

        // Sort by CO₂
        const sortedByCo2 = [...alternativeRoutes].sort(
            (a, b) => a.co2Emissions - b.co2Emissions
        );
        greenestRouteIndex = alternativeRoutes.findIndex(
            (r) => r.co2Emissions === sortedByCo2[0].co2Emissions
        );
    }

    return (
        <Widget
            title="Route Information"
            onClose={onClose}
            className="route-info"
            defaultPosition={{ x: 20, y: 170 }}
        >
            {/* Wrap content in scrollable container if needed */}
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <div className="route-details">
                    {/* Route header with distance & duration */}
                    <div className="route-header">
                        <div className="route-summary">
                            <div className="route-distance">
                                {(route.distance / 1000).toFixed(1)} km
                            </div>
                            <div className="route-duration">
                                {formatDuration(route.duration)}
                            </div>
                        </div>
                    </div>

                    {/* Basic info section */}
                    <div className="info-section">
                        {/* Car Model row */}
                        <div className="info-row">
                            <div className="info-icon car">
                                <MapPin size={18} />
                            </div>
                            <div className="info-content">
                                <span className="info-value">{car.model}</span>
                            </div>
                        </div>

                        {/* Fuel or Electricity usage */}
                        <div className="info-row with-divider">
                            <div className="info-icon fuel">
                                <Droplet size={18} />
                            </div>
                            <div className="info-content">
                                <span className="info-label">{usageLabel}</span>
                                <span className="info-value">
                                    {usageAmount} {usageUnit}
                                </span>
                            </div>
                        </div>

                        {/* Cost row */}
                        <div className="info-row cost">
                            <div className="info-icon">
                                <DollarSign size={18} />
                            </div>
                            <div className="info-content">
                                <span className="info-label">
                                    Estimated {isElectric ? 'Electricity Cost' : 'Cost'}
                                </span>
                                <span className="info-value cost-value">
                                    ${route.fuelCost.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* Toggle for Emissions */}
                        {toggleEmissions && (
                            <div
                                className="eco-toggle"
                                onClick={toggleEmissions}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: '12px',
                                    cursor: 'pointer',
                                    color: '#4caf50'
                                }}
                            >
                                <Leaf size={16} style={{ marginRight: '6px' }} />
                                <span style={{ marginRight: '8px', fontSize: '14px' }}>
                                    Environmental Impact
                                </span>
                                {showEmissions ? (
                                    <ToggleRight size={20} />
                                ) : (
                                    <ToggleLeft size={20} />
                                )}
                            </div>
                        )}
                    </div>

                    {/* Emissions section */}
                    {showEmissions && (
                        <>
                            <EmissionsInfo
                                co2Emissions={route.co2Emissions}
                                emissionRating={route.emissionRating}
                                treeEquivalent={route.treeEquivalent}
                            />

                            {alternativeRoutes.length > 1 && onSelectRoute && (
                                <EmissionsComparison
                                    routes={alternativeRoutes}
                                    selectedRouteIndex={selectedRouteIndex}
                                    onSelectRoute={onSelectRoute}
                                />
                            )}
                        </>
                    )}

                    {/* Alternative routes section */}
                    {alternativeRoutes.length > 1 && onSelectRoute && (
                        <div className="alternative-routes">
                            <div className="route-buttons-header">
                                <Navigation size={16} style={{ marginRight: '6px' }} />
                                Alternative Routes
                            </div>

                            {/** Display best route info (distance + co2) if found */}
                            {(shortestRouteIndex !== null || greenestRouteIndex !== null) && (
                                <div
                                    style={{
                                        backgroundColor: 'rgba(128, 90, 213, 0.06)',
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        marginBottom: '8px',
                                        color: '#805AD5',
                                        fontSize: '14px'
                                    }}
                                >
                                    {shortestRouteIndex !== null && (
                                        <p style={{ margin: '4px 0' }}>
                                            Shortest route: #{shortestRouteIndex + 1}
                                        </p>
                                    )}
                                    {greenestRouteIndex !== null && (
                                        <p style={{ margin: '4px 0' }}>
                                            Eco-friendliest route: #{greenestRouteIndex + 1}
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="route-cards">
                                {alternativeRoutes.map((altRoute, index) => (
                                    <div
                                        key={index}
                                        className={`route-card ${selectedRouteIndex === index ? 'selected' : ''
                                            }`}
                                        onClick={() => onSelectRoute(index)}
                                    >
                                        <div className="route-number">{index + 1}</div>
                                        <div className="route-card-details">
                                            <div className="route-card-distance">
                                                {(altRoute.distance / 1000).toFixed(1)} km
                                            </div>
                                            <div className="route-card-duration">
                                                {formatDuration(altRoute.duration)}
                                            </div>
                                        </div>
                                        {showEmissions && (
                                            <div
                                                className="route-eco-rating"
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    borderRadius: '50%',
                                                    backgroundColor: '#4caf50',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    fontSize: '10px',
                                                    fontWeight: 'bold',
                                                    marginRight: '6px'
                                                }}
                                            >
                                                {altRoute.emissionRating}
                                            </div>
                                        )}
                                        <ChevronRight size={16} className="route-card-icon" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Widget>
    );
};

export default RouteInfo;
