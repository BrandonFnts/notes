import React from 'react';

export const Input = ({ label, value, onChange, placeholder, type = "text", error, className = "" }) => {
    return (
        <div className={`form-control ${className}`}>
            {label && (
                <label className="label">
                    <span className="label-text font-semibold">{label}</span>
                </label>
            )}
            <input
                type={type}
                className={`input input-bordered w-full ${error ? "input-error" : ""}`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {error && (
                <label className="label">
                    <span className="label-text-alt text-error">{error}</span>
                </label>
            )}
        </div>
    );
};
