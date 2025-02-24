// src/components/SettingsWidget.tsx
import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { UserSettings } from '../types/types';
import { Widget } from './Widget.tsx';

export const SettingsWidget: React.FC<{
    settings: UserSettings;
    onUpdate: (settings: UserSettings) => void;
    visible: boolean;
    onClose: () => void;
}> = ({ settings, onUpdate, visible, onClose }) => {
    const [localSettings, setLocalSettings] = useState(settings);
    const [isAnimating, setIsAnimating] = useState(false);

    // Update local settings when props change
    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    if (!visible) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Add animation before saving
        setIsAnimating(true);

        setTimeout(() => {
            onUpdate(localSettings);
            setIsAnimating(false);
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
                        placeholder="e.g., Toyota Corolla"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Fuel Consumption (L/100km)</label>
                    <input
                        type="number"
                        value={localSettings.car.fuelConsumption}
                        onChange={(e) => setLocalSettings({
                            ...localSettings,
                            car: { ...localSettings.car, fuelConsumption: parseFloat(e.target.value) || 0 }
                        })}
                        className="form-input"
                        step="0.1"
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Fuel Price ($/L)</label>
                    <input
                        type="number"
                        value={localSettings.fuelPrice}
                        onChange={(e) => setLocalSettings({
                            ...localSettings,
                            fuelPrice: parseFloat(e.target.value) || 0
                        })}
                        className="form-input"
                        step="0.01"
                        min="0"
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
                        placeholder="e.g., 123 Main St, City"
                    />
                </div>

                {/* <div className="form-group checkbox-group">
                    <input
                        type="checkbox"
                        id="darkMode"
                        checked={localSettings.darkMode}
                        onChange={(e) => setLocalSettings({
                            ...localSettings,
                            darkMode: e.target.checked
                        })}
                        className="checkbox-input"
                    />
                    <label htmlFor="darkMode">Dark Mode</label>
                </div> */}

                <button
                    type="submit"
                    className="form-button"
                >
                    <Save size={18} style={{ marginRight: '8px' }} />
                    Save Settings
                </button>
            </form>
        </Widget>
    );
};