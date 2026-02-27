import { useEffect } from "react";
import { NoteForm } from "./NoteForm";
import { useMonitor, useQuery } from "@/hooks";
import { services } from "@/services";

export const NoteFormController = ({ noteId, onCancel }) => {
    const monitors = useMonitor(["createNote", "updateNote", "getTags", "getNoteById"]);
    const tags = useQuery({ collection: "tags" });
    const activeNoteData = useQuery({ collection: "activeNote", where: [{ field: "id", op: "==", value: noteId }] });

    useEffect(() => {
        services.tags.getTags();
    }, []);

    useEffect(() => {
        if (noteId) {
            services.notes.getNoteById(noteId);
        }
    }, [noteId]);

    const isSaving = monitors.createNote || monitors.updateNote;

    const handleFormSubmit = (formData) => {
        if (noteId) {
            services.notes.updateNote(noteId, formData)
        } else {
            services.notes.createNote(formData)
        }
    };

    const activeNote = activeNoteData?.[0] || null;
    const initialData = noteId ? activeNote : null;

    return (
        <NoteForm
            tags={tags || []}
            tagsLoading={monitors.getTags}
            isLoading={isSaving}
            onSubmit={handleFormSubmit}
            initialData={initialData}
            onCancel={onCancel}
        />
    );
};