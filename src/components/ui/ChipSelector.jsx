import React from 'react';

export const ChipSelector = ({ label, items, selectedItems, onToggle, isLoading, className = "" }) => {
    return (
        <div className={`form-control ${className}`}>
            {label && (
                <label className="label">
                    <span className="label-text font-semibold">{label}</span>
                </label>
            )}
            {isLoading ? (
                <span className="loading loading-dots loading-xs"></span>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {items.map(item => (
                        <div
                            key={item.id}
                            onClick={() => onToggle(item.id)}
                            className={`
                            badge cursor-pointer p-3 select-none transition-colors
                            ${selectedItems.includes(item.id)
                                    ? 'badge-primary font-bold'
                                    : 'badge-outline opacity-70 hover:opacity-100'}
                        `}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
