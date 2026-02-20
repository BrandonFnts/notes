export const ColorPicker = ({ label, options, value, onChange, className = "" }) => {
    return (
        <div className={`form-control ${className}`}>
            {label && (
                <label className="label">
                    <span className="label-text font-semibold">{label}</span>
                </label>
            )}
            <div className="flex gap-3">
                {options.map((opt) => (
                    <div
                        key={opt.value}
                        onClick={() => onChange(opt.value)}
                        className={`
                        w-8 h-8 rounded-full cursor-pointer 
                        border border-base-300 
                        transition-transform duration-200
                        ${value === opt.value ? 'ring-2 ring-primary scale-110' : 'hover:scale-105'}
                    `}
                        style={{ backgroundColor: opt.hex }}
                        title={opt.name}
                    />
                ))}
            </div>
        </div>
    );
};
