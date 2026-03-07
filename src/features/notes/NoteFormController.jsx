import { useEffect } from "react";
import { NoteForm } from "./NoteForm";
import { withReactive } from "@/reactive";

const NoteFormControllerView = ({ monitors, services, tags, activeNote, noteId, onCancel }) => {
    useEffect(() => {
        if (noteId) {
            services.notes.getNoteById(noteId);
        }
    }, [noteId]);

    const isSaving = monitors.createNote || monitors.updateNote;
    const initialData = noteId ? (activeNote?.[0] || null) : null;

    const handleFormSubmit = (formData) => {
        if (noteId) {
            services.notes.updateNote(noteId, formData);
        } else {
            services.notes.createNote(formData);
        }
    };

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

export const NoteFormController = withReactive(NoteFormControllerView, {
    monitors: ["createNote", "updateNote", "getTags", "getNoteById"],

    queries: (props) => ({
        tags: { collection: "tags" },
        activeNote: { collection: "activeNote", where: [{ field: "id", op: "==", value: props.noteId }] },
    }),

    init: ({ services }) => {
        services.tags.getTags();
    },
});