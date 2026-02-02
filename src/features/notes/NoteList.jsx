import { NoteListItem } from "./NoteListItem";

export const NoteList = ({ data, onClick }) => {
    if (!data || data.length === 0) {
        return <div className="text-center p-4 text-gray-500">There are no notes available.</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Contenido</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <NoteListItem 
                            key={item.id} 
                            item={item}
                            onClick={onClick} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};