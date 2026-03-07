import { useState } from "react";
import { Card } from "antd";
import { NoteList } from "./NoteList";
import { NoteFormController } from "./NoteFormController";
import { NotesLoader } from "./NotesLoader";
import { withReactive } from "@/reactive";

const NoteListControllerView = ({ monitors, services }) => {
  const [editingNote, setEditingNote] = useState(null);
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

export const NoteListController = withReactive(NoteListControllerView, {
  monitors: ["getNotes", "deleteNote"],

  init: ({ services }) => {
    services.notes.getNotes();
  },
});