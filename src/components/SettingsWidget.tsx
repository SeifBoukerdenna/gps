import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { UserSettings } from '../types/types';
import { Widget } from './Widget.tsx';
import { FuelType } from '../utils/emissionsUtils';

export const SettingsWidget: React.FC<{
    settings: UserSettings;
    onUpdate: (settings: UserSettings) => void;
    visible: boolean;
    onClose: () => void;
}> = ({ settings, onUpdate, visible, onClose }) => {
    const [localSettings, setLocalSettings] = useState(settings);
    const [isAnimating, setIsAnimating] = useState(false);

    // New state to show a "Saved!" message
    const [saved, setSaved] = useState(false);

    // Update local form state whenever `settings` prop changes
    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    if (!visible) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Brief animation before saving
        setIsAnimating(true);

        setTimeout(() => {
            onUpdate(localSettings);
            setIsAnimating(false);

            // Show "Settings saved!" message for 2 seconds
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        }, 300);
    };

    return (
        <Widget
            title="Settings"
            onClose={onClose}
            className="settings-widget"
            defaultPosition={{ x: window.innerWidth - 370, y: 80 }}
        >
            <form onSubmit={handleSubmit} className={isAnimating ? 'saving' : ''}>
                {/** OPTIONAL: Display the "Settings saved!" text **/}
                {saved && (
                    <div
                        style={{
                            background: 'rgba(72, 187, 120, 0.15)',
                            color: '#48BB78',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            marginBottom: '12px',
                            textAlign: 'center',
                            fontWeight: 600
                        }}
                    >
                        Settings saved!
                    </div>
                )}

                <div className="form-group">
                    <label className="form-label">Car Model</label>
                    <input
                        type="text"
                        value={localSettings.car.model}
                        onChange={(e) =>
                            setLocalSettings({
                                ...localSettings,
                                car: { ...localSettings.car, model: e.target.value }
                            })
                        }
                        className="form-input"
                        placeholder="e.g., Toyota Corolla"
                    />
                </div>

                {/** Fuel Type Selector **/}
                <div className="form-group">
                    <label className="form-label">Fuel Type</label>
                    <select
                        value={localSettings.car.fuelType}
                        onChange={(e) =>
                            setLocalSettings({
                                ...localSettings,
                                car: {
                                    ...localSettings.car,
                                    fuelType: e.target.value as FuelType
                                }
                            })
                        }
                        className="form-input"
                    >
                        <option value="gasoline">Gasoline</option>
                        <option value="diesel">Diesel</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="electric">Electric</option>
                    </select>
                </div>

                {/** Fuel Consumption **/}
                <div className="form-group">
                    <label className="form-label">Fuel Consumption (L/100km)</label>
                    <input
                        type="number"
                        value={localSettings.car.fuelConsumption}
                        onChange={(e) =>
                            setLocalSettings({
                                ...localSettings,
                                car: {
                                    ...localSettings.car,
                                    fuelConsumption: parseFloat(e.target.value) || 0
                                }
                            })
                        }
                        className="form-input"
                        step="0.1"
                        min="0"
                    />
                </div>

                {/** Fuel Price **/}
                <div className="form-group">
                    <label className="form-label">Fuel Price ($/L)</label>
                    <input
                        type="number"
                        value={localSettings.fuelPrice}
                        onChange={(e) =>
                            setLocalSettings({
                                ...localSettings,
                                fuelPrice: parseFloat(e.target.value) || 0
                            })
                        }
                        className="form-input"
                        step="0.01"
                        min="0"
                    />
                </div>

                {/** Home Address **/}
                <div className="form-group">
                    <label className="form-label">Home Address</label>
                    <input
                        type="text"
                        value={localSettings.homeAddress}
                        onChange={(e) =>
                            setLocalSettings({
                                ...localSettings,
                                homeAddress: e.target.value
                            })
                        }
                        className="form-input"
                        placeholder="e.g., 123 Main St, City"
                    />
                </div>

                {/** Show Emissions toggle (checkbox) **/}
                <div className="form-group checkbox-group">
                    <input
                        type="checkbox"
                        id="showEmissions"
                        className="checkbox-input"
                        checked={localSettings.showEmissions}
                        onChange={(e) =>
                            setLocalSettings({
                                ...localSettings,
                                showEmissions: e.target.checked
                            })
                        }
                    />
                    <label htmlFor="showEmissions">Show Emissions</label>
                </div>

                {/**
                 * If you want a Dark Mode checkbox as well, uncomment:
                 *
                 * <div className="form-group checkbox-group">
                 *   <input
                 *     type="checkbox"
                 *     id="darkMode"
                 *     className="checkbox-input"
                 *     checked={localSettings.darkMode}
                 *     onChange={(e) =>
                 *       setLocalSettings({
                 *         ...localSettings,
                 *         darkMode: e.target.checked
                 *       })
                 *     }
                 *   />
                 *   <label htmlFor="darkMode">Dark Mode</label>
                 * </div>
                 */}

                <button type="submit" className="form-button">
                    <Save size={18} style={{ marginRight: '8px' }} />
                    Save Settings
                </button>
            </form>
        </Widget>
    );
};
