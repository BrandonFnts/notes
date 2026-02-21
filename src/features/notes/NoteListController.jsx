import { useState, useEffect } from "react";
import { NoteList } from "./NoteList";
import { NoteFormController } from "./NoteFormController";
import { NotesLoader } from "./NotesLoader";
import { useMonitor } from "@/hooks";
import { services } from "@/services";

export const NoteListController = () => {
  const monitors = useMonitor(["getNotes", "deleteNote"]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    services.notes.getNotes();
  }, []);

  const isLoading = monitors.getNotes || monitors.deleteNote;

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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow-xl h-fit lg:col-span-3">
          <div className="card-body p-4">
            <NotesLoader
              onRefresh={services.notes.getNotes}
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
            <NoteFormController
              noteId={editingNote?.id}
              onCancel={editingNote ? handleCancelEdit : undefined}
              onSuccess={() => setEditingNote(null)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};