// src/components/AboutWidget.tsx
import React, { useState } from 'react';
import { Widget } from './Widget.tsx';
import { Users, MapPin, Sparkles, Fuel, Moon, Code, Mail, Github, Linkedin } from 'lucide-react';

export const AboutWidget: React.FC<{
    visible: boolean;
    onClose: () => void;
}> = ({ visible, onClose }) => {
    const [activeTab, setActiveTab] = useState('app');

    if (!visible) return null;

    return (
        <Widget
            title="About"
            onClose={onClose}
            className="about-widget"
            defaultPosition={{ x: 20, y: 80 }}
        >
            <div className="about-tabs">
                <button
                    className={`about-tab ${activeTab === 'app' ? 'active' : ''}`}
                    onClick={() => setActiveTab('app')}
                >
                    <Sparkles size={16} />
                    The App
                </button>
                <button
                    className={`about-tab ${activeTab === 'team' ? 'active' : ''}`}
                    onClick={() => setActiveTab('team')}
                >
                    <Users size={16} />
                    Our Team
                </button>
            </div>

            <div className="about-content-wrapper">
                {activeTab === 'app' && (
                    <div className="about-content">
                        <p>
                            Welcome to our modern GPS application! This app helps you plan your routes
                            while considering your vehicle's fuel consumption and current gas prices.
                        </p>

                        <div className="feature-item">
                            <div className="feature-icon">
                                <Fuel size={18} />
                            </div>
                            <div className="feature-text">
                                <h4>Fuel Cost Estimation</h4>
                                <p>Calculate how much each trip will cost based on your car's fuel consumption and current gas prices.</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon">
                                <Moon size={18} />
                            </div>
                            <div className="feature-text">
                                <h4>Dark & Light Mode</h4>
                                <p>Choose between dark and light themes for comfortable navigation day or night.</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon">
                                <MapPin size={18} />
                            </div>
                            <div className="feature-text">
                                <h4>Interactive Map</h4>
                                <p>Click anywhere on the map to set your destination or starting point with ease.</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'team' && (
                    <div className="about-content">
                        <div className="team-header">
                            <h3>Software Engineers from Polytechnique Montréal</h3>
                            <div className="school-logo">
                                <Code size={24} />
                            </div>
                        </div>

                        <div className="team-intro">
                            <p>
                                We're software engineering students from Polytechnique Montréal passionate about
                                creating practical applications that solve real-world problems.
                            </p>
                        </div>

                        <div className="team-member">
                            <div className="member-avatar">
                                <div className="member-initial">S</div>
                            </div>
                            <div className="member-info">
                                <h4 className="member-name">Seif Boukerdenna</h4>
                                <p className="member-role">Software Engineer</p>
                                <p className="member-description">
                                    I like to build stuff lmfaoo
                                </p>
                                <div className="member-links">
                                    <a href="mailto:elmelz6472@gmail.com" className="social-link">
                                        <Mail size={16} />
                                        Email
                                    </a>
                                    <a href="https://github.com/SeifBoukerdenna" className="social-link">
                                        <Github size={16} />
                                        GitHub
                                    </a>
                                    <a href="www.linkedin.com/in/seif-boukerdenna" className="social-link">
                                        <Linkedin size={16} />
                                        LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="team-member">
                            <div className="member-avatar">
                                <div className="member-initial">D</div>
                            </div>
                            <div className="member-info">
                                <h4 className="member-name">[Student Name]</h4>
                                <p className="member-role">Software Engineer</p>
                                <p className="member-description">
                                    Enthusiastic about algorithm optimization and data processing.
                                    Specialized in the fuel consumption calculations and settings functionality.
                                </p>
                                <div className="member-links">
                                    <a href="mailto:student@example.com" className="social-link">
                                        <Mail size={16} />
                                        Email
                                    </a>
                                    <a href="https://github.com/username" className="social-link">
                                        <Github size={16} />
                                        GitHub
                                    </a>
                                    <a href="https://linkedin.com/in/username" className="social-link">
                                        <Linkedin size={16} />
                                        LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="project-info">
                            <h4>About This Project</h4>
                            <p>
                                This application was initially developed for internal use at
                                Polytechnique Montréal. After realizing its potential, we decided
                                to make it available to the public to help more people plan routes
                                while being mindful of fuel costs.
                            </p>
                            <p>
                                Feel free to reach out if you have any questions or suggestions!
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </Widget>
    );
};