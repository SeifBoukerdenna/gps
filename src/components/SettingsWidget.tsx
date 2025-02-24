// src/components/SettingsWidget.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { UserSettings } from '../types/types';

export const SettingsWidget: React.FC<{
    settings: UserSettings;
    onUpdate: (settings: UserSettings) => void;
    visible: boolean;
    onClose: () => void;
}> = ({ settings, onUpdate, visible, onClose }) => {
    const [localSettings, setLocalSettings] = useState(settings);

    if (!visible) return null;

    return (
        <div className="widget settings-widget">
            <div className="widget-header">
                <h2 className="widget-title">Settings</h2>
                <button onClick={onClose} className="close-button">
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={(e) => {
                e.preventDefault();
                onUpdate(localSettings);
            }}>
                <div className="form-group">
                    <label className="form-label">Car Model</label>
                    <input
                        type="text"
                        value={localSettings.car.model}
                        onChange={(e) => setLocalSettings({
                            ...localSettings,
                            car: { ...localSettings.car, model: e.target.value }
                        })}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Fuel Consumption (L/100km)</label>
                    <input
                        type="number"
                        value={localSettings.car.fuelConsumption}
                        onChange={(e) => setLocalSettings({
                            ...localSettings,
                            car: { ...localSettings.car, fuelConsumption: parseFloat(e.target.value) }
                        })}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Fuel Price ($/L)</label>
                    <input
                        type="number"
                        value={localSettings.fuelPrice}
                        onChange={(e) => setLocalSettings({
                            ...localSettings,
                            fuelPrice: parseFloat(e.target.value)
                        })}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Home Address</label>
                    <input
                        type="text"
                        value={localSettings.homeAddress}
                        onChange={(e) => setLocalSettings({
                            ...localSettings,
                            homeAddress: e.target.value
                        })}
                        className="form-input"
                    />
                </div>

                <div className="form-group checkbox-group">
                    <input
                        type="checkbox"
                        id="darkMode"
                        checked={localSettings.darkMode}
                        onChange={(e) => setLocalSettings({
                            ...localSettings,
                            darkMode: e.target.checked
                        })}
                        style={{ marginRight: '8px' }}
                    />
                    <label htmlFor="darkMode">Dark Mode</label>
                </div>

                <button
                    type="submit"
                    className="form-button"
                >
                    Save Settings
                </button>
            </form>
        </div>
    );
};