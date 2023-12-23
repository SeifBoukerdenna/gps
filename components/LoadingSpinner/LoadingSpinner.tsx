import React from 'react'
const LoadingSpinner: React.FC = () => {
    const spinnerContainerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    }

    const spinnerStyle: React.CSSProperties = {
        border: '8px solid rgba(0, 0, 0, 0.3)',
        borderTop: '8px solid #3498db',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite',
    }

    return (
        <div style={spinnerContainerStyle}>
            <div style={spinnerStyle}></div>
        </div>
    )
}

export default LoadingSpinner
