import { Button } from "antd";

const classToType = (className = "") => {
    if (className.includes("btn-primary")) return { type: "primary" };
    if (className.includes("btn-warning")) return { type: "primary", style: { backgroundColor: "#faad14", borderColor: "#faad14" } };
    return {};
};

export const LoadingButton = ({ label, isLoading, onClick, type = "button", className = "", disabled = false }) => {
    const antProps = classToType(className);
    const isSmall = className.includes("btn-sm");

    return (
        <Button
            {...antProps}
            loading={isLoading}
            onClick={onClick}
            htmlType={type}
            disabled={disabled}
            size={isSmall ? "small" : "middle"}
        >
            {label}
        </Button>
    );
};