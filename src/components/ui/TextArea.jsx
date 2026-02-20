export const TextArea = ({ label, value, onChange, placeholder, rows = 3, error, className = "" }) => {
    return (
        <div className={`form-control ${className}`}>
            {label && (
                <label className="label">
                    <span className="label-text font-semibold">{label}</span>
                </label>
            )}
            <textarea
                className={`textarea textarea-bordered h-24 ${error ? "textarea-error" : ""}`}
                value={value}
                onChange={onChange}
                rows={rows}
                placeholder={placeholder}
            ></textarea>
            {error && (
                <label className="label">
                    <span className="label-text-alt text-error">{error}</span>
                </label>
            )}
        </div>
    );
};
