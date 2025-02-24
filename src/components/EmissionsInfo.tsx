// src/components/EmissionsInfo.tsx
import React from 'react';
import { Leaf, AlertTriangle, TreePine } from 'lucide-react';
import { getRatingColor } from '../utils/emissionsUtils';

interface EmissionsInfoProps {
    co2Emissions: number;
    emissionRating: string;
    treeEquivalent: number;
    className?: string;
}

export const EmissionsInfo: React.FC<EmissionsInfoProps> = ({
    co2Emissions,
    emissionRating,
    treeEquivalent,
    className = ''
}) => {
    const ratingColor = getRatingColor(emissionRating);

    return (
        <div className={`emissions-info ${className}`}>
            <div className="emissions-header">
                <Leaf size={20} className="emissions-icon" />
                <h3 className="emissions-title">Environmental Impact</h3>
            </div>

            <div className="emissions-content">
                <div className="emission-rating-container">
                    <div
                        className="emission-rating"
                        style={{ backgroundColor: ratingColor }}
                    >
                        {emissionRating}
                    </div>
                    <div className="rating-label">
                        Eco Rating
                    </div>
                </div>

                <div className="emissions-details">
                    <div className="emission-detail">
                        <div className="detail-value">{co2Emissions} kg</div>
                        <div className="detail-label">CO₂ emissions</div>
                    </div>

                    <div className="emission-detail">
                        <div className="detail-value">
                            <div className="tree-equivalent">
                                <TreePine size={18} />
                                <span>× {treeEquivalent}</span>
                            </div>
                        </div>
                        <div className="detail-label">Trees needed for 1 year to absorb</div>
                    </div>
                </div>

                {co2Emissions > 10 && (
                    <div className="eco-tip">
                        <AlertTriangle size={16} />
                        <span>Consider alternate routes to reduce your carbon footprint.</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmissionsInfo;