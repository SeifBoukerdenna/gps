// src/components/EmissionsComparison.tsx
import React from 'react';
import { BarChart2 } from 'lucide-react';
import { RouteInfoType } from '../types/types';
import { getRatingColor } from '../utils/emissionsUtils';

interface EmissionsComparisonProps {
    routes: RouteInfoType[];
    selectedRouteIndex: number;
    onSelectRoute: (index: number) => void;
}

export const EmissionsComparison: React.FC<EmissionsComparisonProps> = ({
    routes,
    selectedRouteIndex,
    onSelectRoute
}) => {
    if (routes.length <= 1) return null;

    // Sort routes by emissions (lowest first)
    const sortedRoutes = [...routes].sort((a, b) => a.co2Emissions - b.co2Emissions);

    // Find the most eco-friendly route
    const mostEcoFriendlyIndex = routes.findIndex(
        route => route.co2Emissions === sortedRoutes[0].co2Emissions
    );

    // Check if the selected route is the most eco-friendly
    const isSelectedMostEcoFriendly = selectedRouteIndex === mostEcoFriendlyIndex;

    return (
        <div className="emissions-comparison">
            <div className="comparison-header">
                <BarChart2 size={16} style={{ marginRight: '6px' }} />
                Route Emissions Comparison
            </div>

            <table className="route-comparison-table">
                <thead>
                    <tr>
                        <th>Route</th>
                        <th>Distance</th>
                        <th>CO₂</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {routes.map((route, index) => (
                        <tr
                            key={index}
                            className={index === selectedRouteIndex ? 'selected' : ''}
                            onClick={() => onSelectRoute(index)}
                        >
                            <td>Option {index + 1}</td>
                            <td>{(route.distance / 1000).toFixed(1)} km</td>
                            <td>{route.co2Emissions} kg</td>
                            <td className="rating-cell">
                                <div
                                    className="rating-badge"
                                    style={{ backgroundColor: getRatingColor(route.emissionRating) }}
                                >
                                    {route.emissionRating}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {!isSelectedMostEcoFriendly && (
                <div className="eco-tip" style={{ marginTop: '8px' }}>
                    <span>
                        Route {mostEcoFriendlyIndex + 1} has the lowest environmental impact.
                    </span>
                </div>
            )}
        </div>
    );
};

export default EmissionsComparison;