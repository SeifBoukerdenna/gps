// src/components/KeyboardShortcuts.tsx
import React from 'react';
import { Widget } from './Widget.tsx';

interface KeyboardShortcutsProps {
    visible: boolean;
    onClose: () => void;
}

export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ visible, onClose }) => {
    if (!visible) return null;

    return (
        <Widget
            title="Keyboard Shortcuts"
            onClose={onClose}
            className="keyboard-shortcuts-widget"
            defaultPosition={{ x: window.innerWidth - 370, y: 150 }}
        >
            <div className="shortcuts-list">
                <div className="shortcut-group">
                    <h3 className="shortcut-group-title">Navigation</h3>

                    <div className="shortcut-item">
                        <div className="key-combo">
                            <span className="key">M</span>
                        </div>
                        <div className="shortcut-description">
                            Toggle map click mode
                        </div>
                    </div>

                    <div className="shortcut-item">
                        <div className="key-combo">
                            <span className="key">H</span>
                        </div>
                        <div className="shortcut-description">
                            Set home as starting point
                        </div>
                    </div>

                    <div className="shortcut-item">
                        <div className="key-combo">
                            <span className="key">F</span>
                        </div>
                        <div className="shortcut-description">
                            Focus destination search
                        </div>
                    </div>

                    <div className="shortcut-item">
                        <div className="key-combo">
                            <span className="key">Shift</span>
                            <span className="key">F</span>
                        </div>
                        <div className="shortcut-description">
                            Focus starting point search
                        </div>
                    </div>
                </div>

                <div className="shortcut-group">
                    <h3 className="shortcut-group-title">Routes</h3>

                    <div className="shortcut-item">
                        <div className="key-combo">
                            <span className="key">1</span>
                        </div>
                        <div className="shortcut-description">
                            Select route 1
                        </div>
                    </div>

                    <div className="shortcut-item">
                        <div className="key-combo">
                            <span className="key">2</span>
                        </div>
                        <div className="shortcut-description">
                            Select route 2
                        </div>
                    </div>

                    <div className="shortcut-item">
                        <div className="key-combo">
                            <span className="key">3</span>
                        </div>
                        <div className="shortcut-description">
                            Select route 3
                        </div>
                    </div>

                    <div className="shortcut-item">
                        <div className="key-combo">
                            <span className="key">C</span>
                        </div>
                        <div className="shortcut-description">
                            Calculate route
                        </div>
                    </div>
                </div>

                <div className="shortcut-group">
                    <h3 className="shortcut-group-title">Interface</h3>

                    <div className="shortcut-item">
                        <div className="key-combo">
                            <span className="key">D</span>
                        </div>
                        <div className="shortcut-description">
                            Toggle dark mode
                        </div>
                    </div>

                    <div className="shortcut-item">
                        <div className="key-combo">
                            <span className="key">S</span>
                        </div>
                        <div className="shortcut-description">
                            Open settings
                        </div>
                    </div>

                    <div className="shortcut-item">
                        <div className="key-combo">
                            <span className="key">A</span>
                        </div>
                        <div className="shortcut-description">
                            Open about
                        </div>
                    </div>

                    <div className="shortcut-item">
                        <div className="key-combo">
                            <span className="key">I</span>
                        </div>
                        <div className="shortcut-description">
                            Toggle route info
                        </div>
                    </div>
                </div>

                <div className="shortcut-group">
                    <h3 className="shortcut-group-title">General</h3>

                    <div className="shortcut-item">
                        <div className="key-combo">
                            <span className="key">?</span>
                        </div>
                        <div className="shortcut-description">
                            Show/hide keyboard shortcuts
                        </div>
                    </div>

                    <div className="shortcut-item">
                        <div className="key-combo">
                            <span className="key">Esc</span>
                        </div>
                        <div className="shortcut-description">
                            Close current panel
                        </div>
                    </div>

                    <div className="shortcut-item">
                        <div className="key-combo">
                            <span className="key">R</span>
                        </div>
                        <div className="shortcut-description">
                            Reset application
                        </div>
                    </div>

                    <div className="shortcut-item">
                        <div className="key-combo">
                            <span className="key">T</span>
                        </div>
                        <div className="shortcut-description">
                            Toggle tips visibility
                        </div>
                    </div>
                </div>
            </div>
        </Widget>
    );
};