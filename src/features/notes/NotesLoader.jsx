import { useState } from "react";
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
                <div className="text-2xl font-bold">My Notes</div>
                <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full sm:w-auto items-center">
                    
                    <input 
                        type="text" 
                        placeholder="Search title..." 
                        className="input input-bordered input-sm w-full sm:w-40" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} 
                    />

                    <select 
                        className="select select-bordered select-sm w-full sm:w-auto"
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value)}
                    >
                        <option value="createdAt">Date</option>
                        <option value="title">Title</option>
                    </select>

                    <button 
                        className="btn btn-sm btn-square btn-ghost border-base-300"
                        onClick={toggleSortDir}
                        title={sortDir === 'asc' ? "Ascending" : "Descending"}
                    >
                        {sortDir === 'asc' ? "Asc" : "Desc"}
                    </button>

                    <LoadingButton 
                        label="Refresh" 
                        isLoading={isLoading} 
                        onClick={onRefresh} 
                        className="btn-sm"
                    />
                </div>
            </div>

            {children({ notes: filteredNotes })}
        </div>
    );
};