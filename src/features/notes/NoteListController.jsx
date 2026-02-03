import { useState } from "react";
import { NoteList } from "./NoteList";
import { NoteForm } from "./NoteForm";
import { LoadingButton } from "@/components";
import { useAction } from "@/hooks";
import { noteService, notifyService } from "@/services";

export const NoteListController = () => {
    
    const [editingNote, setEditingNote] = useState(null);

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
            notifyService.success('Note created.');
            notesExecute();
        },
        onError: () => notifyService.error('Error creating note.')
    });

    const [,, updateExecute, updateError] = useAction({
        action: noteService.updateNote,
        executeOnInit: false,
        onSuccess: () => {
            notifyService.success('Note updated.');
            setEditingNote(null);
            notesExecute();
        },
        onError: () => notifyService.error('Error updating note.')
    });

    const [,, deleteExecute] = useAction({
        action: noteService.deleteNote,
        executeOnInit: false,
        onSuccess: () => {
            notifyService.success('Note deleted.');
            setEditingNote((prev) => (prev ? null : prev)); 
            notesExecute();
        },
        onError: () => notifyService.error('Error deleting note.')
    });

    const handleSelectNote = (note) => {
        setEditingNote(note);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteNote = async (id, e) => {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this note?")) {
            await deleteExecute(id);
        }
    };

    const handleFormSubmit = async (formData) => {
        if (editingNote) {
            await updateExecute(editingNote.id, formData);
        } else {
            await createExecute(formData);
        }
    };

    const handleCancelEdit = () => {
        setEditingNote(null);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">My Notes</div>
                <LoadingButton 
                    label="Refresh" 
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
                            onClick={handleSelectNote}
                            onDelete={handleDeleteNote}
                        />
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl h-fit">
                    <div className="card-body">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="card-title text-sm opacity-70">
                                {editingNote ? `Editing: ${editingNote.title}` : "New Note"}
                            </h3>
                            {editingNote && (
                                <button 
                                    onClick={handleCancelEdit}
                                    className="btn btn-xs btn-ghost text-error"
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </div>

                        <NoteForm 
                            tags={tags}
                            tagsLoading={tagsLoading}
                            onSubmit={handleFormSubmit}
                            error={editingNote ? updateError : createError}
                            initialData={editingNote}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};