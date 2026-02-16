import { GhostRedButton } from "@/components";

export const NoteListItem = ({ item, onClick, onDelete }) => {

    const bgColor = item.color || "#CCCCCC";

    return (
        <tr onClick={() => onClick(item)} className="cursor-pointer hover:bg-base-200 group">
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                        <div className="mask mask-squircle h-12 w-12 flex items-center justify-center text-black/50" style={{ backgroundColor: bgColor }}>
                            <span className="text-xl font-bold">{item.title ? item.title.charAt(0).toUpperCase() : "?"}</span>
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{item.title}</div>
                        <div className="flex gap-1 mt-1">
                            {item.tags && item.tags.length > 0 ? (
                                item.tags.map(t => <span key={t.id} className="badge badge-xs badge-ghost">{t.name}</span>)
                            ) : <span className="text-xs opacity-50">ID: {item.id}</span>}
                        </div>
                    </div>
                </div>
            </td>

            <td>
                <div className="max-w-md truncate opacity-70">
                    {item.content}
                </div>
            </td>

            <td>
                <div className="opacity-70">
                    {new Date(item.createdAt).toLocaleDateString()}
                </div>
            </td>

            <td className="text-right">
                <GhostRedButton onClick={(e) => onDelete(item.id, e)}>
                    Delete
                </GhostRedButton>
            </td>
        </tr>
    );
};