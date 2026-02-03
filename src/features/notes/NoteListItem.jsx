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

            <td className="text-right">
                <button 
                    onClick={(e) => onDelete(item.id, e)}
                    className="btn btn-ghost btn-xs text-error opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Eliminar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </td>
        </tr>
    );
};