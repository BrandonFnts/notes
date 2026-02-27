import { useState } from "react";
import { Input, Select, Button, Typography, Space } from "antd";
import { ReloadOutlined, SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";
import { LoadingButton } from "@/components";
import { useQuery } from "@/hooks/useQuery";

export const NotesLoader = ({ isLoading, onRefresh, children }) => {
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState("createdAt");
    const [sortDir, setSortDir] = useState("desc");
    const filters = [];

    if (search) {
        filters.push({ field: 'title', op: 'contains', value: search });
    }

    const filteredNotes = useQuery({
        collection: 'notes',
        where: filters,
        orderBy: { field: sortField, dir: sortDir }
    });

    const toggleSortDir = () => {
        setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
                <Typography.Title level={4} style={{ margin: 0 }}>My Notes</Typography.Title>
                <Space wrap>
                    <Input
                        placeholder="Search title..."
                        size="small"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: 160 }}
                        allowClear
                    />

                    <Select
                        size="small"
                        value={sortField}
                        onChange={(value) => setSortField(value)}
                        style={{ width: 100 }}
                        options={[
                            { value: 'createdAt', label: 'Date' },
                            { value: 'title', label: 'Title' },
                        ]}
                    />

                    <Button
                        size="small"
                        icon={sortDir === 'asc' ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
                        onClick={toggleSortDir}
                        title={sortDir === 'asc' ? "Ascending" : "Descending"}
                    />

                    <LoadingButton
                        label="Refresh"
                        isLoading={isLoading}
                        onClick={onRefresh}
                        className="btn-sm"
                    />
                </Space>
            </div>

            {children({ notes: filteredNotes })}
        </div>
    );
};