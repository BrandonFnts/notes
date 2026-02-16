import { noteClient } from "@/sdk/noteClient";
import { createService } from "@/reactive";
import { notifyService } from "./notifyService";

const noteReactor = {
  collection: "notes",
  onSuccess: ({ action, payload, params, db }) => {

    switch (action) {
      case "getNotes":
        db.collection("notes").bulkWrite(payload);
        break;

      case "getNoteById":
        db.collection("activeNote").bulkWrite([payload]);
        break;

      case "createNote":
        db.collection("notes").insertOne(payload);
        notifyService.success("Note created successfully.");
        break;

      case "updateNote":
        db.collection("notes").updateOne(payload.id, payload);
        notifyService.success("Note updated successfully.");
        break;

      case "deleteNote":
        db.collection("notes").deleteOne(params[0]);
        notifyService.success("Note deleted successfully.");
        break;
    }
  },
  onError: ({ action }) => {

    let mensaje = "Something went wrong. Please try again.";

    switch (action) {
      case "getNotes":
        mensaje = "Failed to load notes. Please check your connection.";
        break;
      case "getNoteById":
        mensaje = "Failed to load note details.";
        break;
      case "createNote":
        mensaje = "Error saving note. Please try again.";
        break;
      case "updateNote":
        mensaje = "Error updating note. Please try again.";
        break;
      case "deleteNote":
        mensaje = "Error deleting note. Please try again.";
        break;
    }

    notifyService.error(mensaje);
  },
};

export const noteService = createService(noteClient, noteReactor);