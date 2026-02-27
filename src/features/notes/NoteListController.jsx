import { useState, useEffect } from "react";
import { Card } from "antd";
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

  const handleDeleteNote = (id) => {
    services.notes.deleteNote(id);
    if (editingNote?.id === id) setEditingNote(null);
  };

  const handleViewNote = (note) => {
    console.log("view", note);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 lg:flex-[3]">
        <Card>
          <NotesLoader
            onRefresh={services.notes.getNotes}
            isLoading={isLoading}
          >
            {({ notes }) => (
              <NoteList
                data={notes}
                isLoading={isLoading}
                onDelete={handleDeleteNote}
                onEdit={handleSelectNote}
                onView={handleViewNote}
              />
            )}
          </NotesLoader>
        </Card>
      </div>

      <div className="lg:flex-1">
        <Card>
          <NoteFormController
            noteId={editingNote?.id}
            onCancel={editingNote ? handleCancelEdit : undefined}
            onSuccess={() => setEditingNote(null)}
          />
        </Card>
      </div>
    </div>
  );
};