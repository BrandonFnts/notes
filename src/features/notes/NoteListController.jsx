import { useState } from "react";
import { NoteList } from "./NoteList";
import { NoteForm } from "./NoteForm";
import { NotesLoader } from "./NotesLoader";
import { withReactive } from "@/reactive";
import { notifyService } from "@/services/notifyService";

export const NoteListController = withReactive(
  ({ data, services, monitors, onClick }) => {
    const [editingNote, setEditingNote] = useState(null);
    const isLoading = false;
    /*  monitors.notes.getNotes || 
        monitors.tags.getTags ||
        monitors.notes.createNote ||
        monitors.notes.updateNote ||
        monitors.notes.deleteNote; */

    const handleSelectNote = (note) => {
      setEditingNote(note);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
      setEditingNote(null);
    };

    const handleDeleteNote = async (id, e) => {
      e.stopPropagation();
      if (confirm("Are you sure you want to delete this note?")) {
        try {
            await services.notes.deleteNote(id);
            notifyService.success("Note deleted.");
            if (editingNote?.id === id) setEditingNote(null);
        } catch (error) {
            notifyService.error("Error deleting note");
        }
      }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (editingNote) {
                await services.notes.updateNote(editingNote.id, formData);
                notifyService.success('Note updated.');
                setEditingNote(null);
            } else {
                await services.notes.createNote(formData);
                notifyService.success('Note created.');
            }
        } catch (error) {
            notifyService.error('Error saving note.');
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
                {({ notes }) => {
                  return (
                    <NoteList
                      data={notes}
                      isLoading={isLoading}
                      onClick={handleSelectNote}
                      onDelete={handleDeleteNote}
                    />
                  );
                }}
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
                tagsLoading={isLoading}
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
    // monitors: ({ services }) => [
    //   services.notes.getNotes,
    //   services.notes.createNote,
    //   services.notes.updateNote,
    //   services.tags.getTags
    // ]
  }
);