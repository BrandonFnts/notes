import { Button } from "antd";

export const GhostRedButton = ({ onClick, children, className = "", type = "button" }) => {
    return (
        <Button
            type="text"
            danger
            size="small"
            onClick={onClick}
            htmlType={type}
            className={className}
        >
            {children}
        </Button>
    );
};
