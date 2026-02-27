import { Typography } from "antd";
import { CrudTable } from "@/components";

const columns = [
    { field: 'title', title: 'Title', type: 'bold' },
    { field: 'content', title: 'Content', type: 'secondary', ellipsis: true },
    { field: 'tags', title: 'Tags', type: 'tags' },
    { field: 'color', title: 'Color', type: 'color' },
    { field: 'createdAt', title: 'Date', type: 'date' },
];

export const NoteList = ({ data, onDelete, onEdit, onView }) => {
    return (
        <CrudTable
            columns={columns}
            dataSource={data}
            actionConfig={{ delete: true, edit: true, view: true }}
            onDelete={(record) => onDelete(record.id)}
            onEdit={(record) => onEdit(record)}
            onView={(record) => onView(record)}
        />
    );
};
