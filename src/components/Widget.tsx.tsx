// src/components/Widget.tsx
import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface WidgetProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    defaultPosition?: { x: number; y: number };
}

export const Widget: React.FC<WidgetProps> = ({
    title,
    onClose,
    children,
    className = '',
    defaultPosition
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState(defaultPosition || { x: 20, y: 20 });
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const widgetRef = useRef<HTMLDivElement>(null);

    // Handle mouse down for dragging
    const handleMouseDown = (e: React.MouseEvent) => {
        // Only start dragging if clicking on the header
        const target = e.target as HTMLElement;
        if (target.closest('.widget-header')) {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
            e.preventDefault();
        }
    };

    // Handle mouse move for dragging
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                // Calculate new position
                const newX = e.clientX - dragStart.x;
                const newY = e.clientY - dragStart.y;

                // Set bounds to prevent dragging outside the window
                const maxX = window.innerWidth - (widgetRef.current?.offsetWidth || 0);
                const maxY = window.innerHeight - (widgetRef.current?.offsetHeight || 0);

                setPosition({
                    x: Math.max(0, Math.min(newX, maxX)),
                    y: Math.max(0, Math.min(newY, maxY))
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStart]);

    return (
        <div
            ref={widgetRef}
            className={`widget ${className} ${isDragging ? 'dragging' : ''}`}
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
            onMouseDown={handleMouseDown}
        >
            <div className="widget-header">
                <h2 className="widget-title">{title}</h2>
                <button onClick={onClose} className="close-button">
                    <X size={24} />
                </button>
            </div>
            <div className="widget-content">
                {children}
            </div>
        </div>
    );
};