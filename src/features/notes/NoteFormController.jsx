import { useEffect } from "react";
import { withReactive } from "@/reactive";
import { NoteForm } from "./NoteForm";

export const NoteFormController = withReactive(
    ({ data, services, monitors, noteId, onCancel, onSuccess }) => {
        const isSaving = monitors.createNote || monitors.updateNote;

        useEffect(() => {
            if (noteId) {
                services.notes.getNoteById(noteId);
            }
        }, [noteId]);

        const handleFormSubmit = (formData) => {
            if (noteId) {
                services.notes.updateNote(noteId, formData)
                    .then(() => onSuccess?.());
            } else {
                services.notes.createNote(formData)
                    .then(() => {
                        onSuccess?.();
                    });
            }
        };

        const activeNote = data.activeNote?.[0] || null;
        const initialData = noteId ? activeNote : null;

        return (
            <NoteForm
                tags={data.tags || []}
                tagsLoading={monitors.getTags}
                isLoading={isSaving}
                onSubmit={handleFormSubmit}
                initialData={initialData}
                onCancel={onCancel}
            />
        );
    },
    {
        init: ({ services }) => {
            services.tags.getTags();
        },
        queries: () => [
            {
                collection: "tags",
                name: "tags",
                defaultValue: [],
            },
            {
                collection: "activeNote",
                name: "activeNote",
                defaultValue: [],
            }
        ],
        monitors: () => ["createNote", "updateNote", "getTags", "getNoteById"],
    }
);