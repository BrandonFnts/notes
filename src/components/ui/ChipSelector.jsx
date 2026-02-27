import { Tag, Spin } from "antd";

export const ChipSelector = ({ label, items, selectedItems, onToggle, isLoading, className = "" }) => {
    return (
        <div className={className}>
            {label && (
                <label style={{ display: "block", marginBottom: 4, fontWeight: 600 }}>{label}</label>
            )}
            {isLoading ? (
                <Spin size="small" />
            ) : (
                <div className="flex flex-wrap gap-2">
                    {items.map(item => (
                        <Tag.CheckableTag
                            key={item.id}
                            checked={selectedItems.includes(item.id)}
                            onChange={() => onToggle(item.id)}
                            style={{ cursor: "pointer", padding: "4px 12px", borderRadius: 16 }}
                        >
                            {item.name}
                        </Tag.CheckableTag>
                    ))}
                </div>
            )}
        </div>
    );
};
