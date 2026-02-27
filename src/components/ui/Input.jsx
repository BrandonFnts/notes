import { Input as AntInput, Typography } from "antd";

export const Input = ({ label, value, onChange, placeholder, type = "text", error, className = "", ...rest }) => {
    return (
        <div className={className}>
            {label && (
                <label style={{ display: "block", marginBottom: 4, fontWeight: 600 }}>{label}</label>
            )}
            {type === "password" ? (
                <AntInput.Password
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    status={error ? "error" : undefined}
                    {...rest}
                />
            ) : (
                <AntInput
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    status={error ? "error" : undefined}
                    {...rest}
                />
            )}
            {error && (
                <Typography.Text type="danger" style={{ fontSize: 12 }}>{error}</Typography.Text>
            )}
        </div>
    );
};
