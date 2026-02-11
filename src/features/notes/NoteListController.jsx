import { useState } from "react";
import { NoteList } from "./NoteList";
import { NoteForm } from "./NoteForm";
import { NotesLoader } from "./NotesLoader";
import { withReactive } from "@/reactive";

export const NoteListController = withReactive(
  ({ data, services, monitors }) => {
    const [editingNote, setEditingNote] = useState(null);

    const isLoading =
      monitors.getNotes ||
      monitors.getTags ||
      monitors.createNote ||
      monitors.updateNote ||
      monitors.deleteNote;

    const handleSelectNote = (note) => {
      setEditingNote(note);
    };

    const handleCancelEdit = () => {
      setEditingNote(null);
    };

    const handleDeleteNote = (id, e) => {
      e.stopPropagation();
      if (confirm("Are you sure you want to delete this note?")) {
          services.notes.deleteNote(id);
          if (editingNote?.id === id) setEditingNote(null);
      }
    };

    const handleFormSubmit = (formData) => {
      if (editingNote) {
        services.notes.updateNote(editingNote.id, formData)
            .then(() => setEditingNote(null));
      } else {
        services.notes.createNote(formData);
      }
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="card bg-base-100 shadow-xl h-fit lg:col-span-3">
            <div className="card-body p-4">
              <NotesLoader
                onClick={services.notes.getNotes}
                isLoading={isLoading}
              >
                {({ notes }) => (
                    <NoteList
                      data={notes}
                      isLoading={isLoading}
                      onClick={handleSelectNote}
                      onDelete={handleDeleteNote}
                    />
                )}
              </NotesLoader>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl h-fit lg:col-span-1">
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
                    Cancel
                  </button>
                )}
              </div>

              <NoteForm
                tags={data.tags || []}
                tagsLoading={monitors.getTags}
                onSubmit={handleFormSubmit}
                initialData={editingNote}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
  {
    init: ({ services }) => {
      services.notes.getNotes();
      services.tags.getTags();
    },
    queries: () => [
      {
        collection: "notes",
        name: "notes",
        defaultValue: [],
      },
      {
        collection: "tags",
        name: "tags",
        defaultValue: [],
      },
    ],
    monitors: () => [
      "getNotes",
      "createNote",
      "updateNote",
      "deleteNote",
      "getTags",
    ],
  }
);