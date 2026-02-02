import { NoteList } from "./NoteList";
import { NoteForm } from "./NoteForm";
import { LoadingButton } from "@/components";
import { useAction } from "@/hooks";
import { noteService, notifyService } from "@/services";

export const NoteListController = ({ onClick }) => {
    
    const [notes, notesLoading, notesExecute] = useAction({ 
        action: noteService.getNotes,
        key: 'notes',
        executeOnInit: true,
        initialValue: [],
        onError: () => notifyService.error('Error fetching notes.'),
    });

    const [tags, tagsLoading] = useAction({
        action: noteService.getTags,
        key: 'tags',
        executeOnInit: true,
        initialValue: []
    });

    const [,, createExecute, createError] = useAction({
        action: noteService.createNote,
        executeOnInit: false,
        onSuccess: () => {
            notifyService.success('Note created successfully.');
            notesExecute();
        },
        onError: () => notifyService.error('Error creating note.')
    });

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">My Notes</div>
                <LoadingButton 
                    label="Refresh List" 
                    isLoading={notesLoading} 
                    onClick={() => notesExecute()} 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                <div className="card bg-base-100 shadow-xl h-fit">
                    <div className="card-body p-4">
                        <h3 className="card-title text-sm opacity-70 mb-4">Notes</h3>
                        <NoteList 
                            data={notes}
                            isLoading={notesLoading}
                            onClick={onClick} 
                        />
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl h-fit">
                    <div className="card-body">
                        <h3 className="card-title text-sm opacity-70 mb-4">New Note</h3>
                        <NoteForm 
                            tags={tags}
                            tagsLoading={tagsLoading}
                            onSubmit={createExecute}
                            error={createError}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};