import React from 'react';

export const GhostRedButton = ({ onClick, children, className = "", type = "button" }) => {
    return (
        <button
            onClick={onClick}
            className={`btn btn-xs btn-ghost text-error ${className}`}
            type={type}
        >
            {children}
        </button>
    );
};
