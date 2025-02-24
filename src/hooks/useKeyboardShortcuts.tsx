// src/hooks/useKeyboardShortcuts.tsx
import { useEffect, useState, useRef } from 'react';

type ShortcutCallbacks = {
    toggleSettings?: () => void;
    toggleAbout?: () => void;
    toggleMapClickMode?: () => void;
    toggleDarkMode?: () => void;
    setHomeAsStart?: () => void;
    resetApp?: () => void;
    closePanel?: () => void;
    toggleShortcutsPanel?: () => void;
    focusDestinationSearch?: () => void;
    focusStartPointSearch?: () => void;
    selectRoute?: (index: number) => void;
    calculateRoute?: () => void;
    toggleRouteInfo?: () => void;
    toggleTips?: () => void;
};

export const useKeyboardShortcuts = (callbacks: ShortcutCallbacks) => {
    const [shortcutsVisible, setShortcutsVisible] = useState(false);

    // Refs to input elements for focus
    const destinationInputRef = useRef<HTMLInputElement | null>(null);
    const startPointInputRef = useRef<HTMLInputElement | null>(null);

    // Set up refs to input elements
    useEffect(() => {
        destinationInputRef.current = document.querySelector('.search-bar input');
        startPointInputRef.current = document.querySelector('.start-point-input input');
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't trigger shortcuts when typing in form fields
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            // Process key combinations
            const key = e.key.toLowerCase();

            // Handle key combinations
            switch (key) {
                case 's':
                    callbacks.toggleSettings?.();
                    break;

                case 'a':
                    callbacks.toggleAbout?.();
                    break;

                case 'm':
                    callbacks.toggleMapClickMode?.();
                    break;

                case 'd':
                    callbacks.toggleDarkMode?.();
                    break;

                case 'h':
                    callbacks.setHomeAsStart?.();
                    break;

                case 'r':
                    callbacks.resetApp?.();
                    break;

                case 'escape':
                    callbacks.closePanel?.();
                    break;

                case '?':
                    setShortcutsVisible(!shortcutsVisible);
                    break;

                case 'f':
                    if (e.shiftKey) {
                        // Focus start point search
                        if (startPointInputRef.current) {
                            startPointInputRef.current.focus();
                        }
                    } else {
                        // Focus destination search
                        if (destinationInputRef.current) {
                            destinationInputRef.current.focus();
                        }
                    }
                    break;

                case '1':
                case '2':
                case '3':
                    {
                        const routeIndex = parseInt(key) - 1;
                        callbacks.selectRoute?.(routeIndex);
                        break;
                    }

                case 'c':
                    callbacks.calculateRoute?.();
                    break;

                case 'i':
                    callbacks.toggleRouteInfo?.();
                    break;

                case 't':
                    callbacks.toggleTips?.();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [
        callbacks,
        shortcutsVisible
    ]);

    return {
        shortcutsVisible,
        setShortcutsVisible
    };
};