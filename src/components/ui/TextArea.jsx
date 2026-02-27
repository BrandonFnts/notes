import { Input, Typography } from "antd";

export const TextArea = ({ label, value, onChange, placeholder, rows = 3, error, className = "" }) => {
    return (
        <div className={className}>
            {label && (
                <label style={{ display: "block", marginBottom: 4, fontWeight: 600 }}>{label}</label>
            )}
            <Input.TextArea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                status={error ? "error" : undefined}
            />
            {error && (
                <Typography.Text type="danger" style={{ fontSize: 12 }}>{error}</Typography.Text>
            )}
        </div>
    );
};
