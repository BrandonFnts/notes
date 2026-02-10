import { noteClient } from "@/sdk/noteClient";
import { createService } from "../reactive";

const noteServiceDefinition = {
  onSuccess: ({ action, payload, params, db }) => {
    
    switch (action) {
      case "getNotes":
        db.collection("notes").bulkWrite(payload);
        break;

      case "createNote": 
        db.collection("notes").insertOne(payload);
        break;

      case "updateNote": 
        db.collection("notes").updateOne(payload.id, payload);
        break;

      case "deleteNote": 
        db.collection("notes").deleteOne(params[0]);
        break;
        
      default:
        break;
    }
  },
  
  onError: (error) => {
    console.error("NoteService Error:", error);
  },
};

export const noteService = createService(noteClient, noteServiceDefinition);