// src/components/WelcomeSplash.tsx
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Fuel, X } from 'lucide-react';

interface WelcomeSplashProps {
    onClose: () => void;
}

export const WelcomeSplash: React.FC<WelcomeSplashProps> = ({ onClose }) => {
    const [visible, setVisible] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance slides
    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentSlide < 2) {
                setCurrentSlide(currentSlide + 1);
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [currentSlide]);

    const handleClose = () => {
        setVisible(false);
        // Small delay to allow exit animation
        setTimeout(onClose, 500);
    };

    const slides = [
        {
            icon: <MapPin size={32} />,
            title: "Plan Your Route",
            description: "Set your starting point and destination to get optimal routes for your journey."
        },
        {
            icon: <Fuel size={32} />,
            title: "Save on Fuel",
            description: "Calculate fuel costs based on your vehicle's consumption and current gas prices."
        },
        {
            icon: <Navigation size={32} />,
            title: "Compare Routes",
            description: "View alternative routes and choose the one that best fits your needs."
        }
    ];

    if (!visible) return null;

    return (
        <div className="welcome-splash">
            <div className="splash-content">
                <button onClick={handleClose} className="splash-close">
                    <X size={24} />
                </button>

                <div className="splash-logo">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                            fill="#805AD5" />
                    </svg>
                </div>

                <h1 className="splash-title">RouteWise</h1>
                <p className="splash-subtitle">Smart routing with real fuel cost estimation</p>

                <div className="splash-slides">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`splash-slide ${index === currentSlide ? 'active' : ''}`}
                        >
                            <div className="slide-icon">{slide.icon}</div>
                            <h2 className="slide-title">{slide.title}</h2>
                            <p className="slide-description">{slide.description}</p>
                        </div>
                    ))}
                </div>

                <div className="splash-indicators">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>

                <button onClick={handleClose} className="splash-button">
                    Get Started
                </button>
            </div>
        </div>
    );
};