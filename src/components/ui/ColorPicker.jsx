export const ColorPicker = ({ label, options, value, onChange, className = "" }) => {
    return (
        <div className={className}>
            {label && (
                <label style={{ display: "block", marginBottom: 4, fontWeight: 600 }}>{label}</label>
            )}
            <div className="flex gap-3">
                {options.map((opt) => (
                    <div
                        key={opt.value}
                        onClick={() => onChange(opt.value)}
                        className="cursor-pointer"
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            backgroundColor: opt.hex,
                            border: value === opt.value ? "2px solid #1677ff" : "1px solid #d9d9d9",
                            transform: value === opt.value ? "scale(1.1)" : "scale(1)",
                            transition: "transform 0.2s, border 0.2s",
                        }}
                        title={opt.name}
                    />
                ))}
            </div>
        </div>
    );
};
