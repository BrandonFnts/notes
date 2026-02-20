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

    let message = "Something went wrong. Please try again.";

    switch (action) {
      case "getNotes":
        message = "Failed to load notes. Please check your connection.";
        break;
      case "getNoteById":
        message = "Failed to load note details.";
        break;
      case "createNote":
        message = "Error saving note. Please try again.";
        break;
      case "updateNote":
        message = "Error updating note. Please try again.";
        break;
      case "deleteNote":
        message = "Error deleting note. Please try again.";
        break;
    }

    notifyService.error(message);
  },
};

export const noteService = createService(noteClient, noteReactor);