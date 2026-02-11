import { tagClient } from "@/sdk/tagClient";
import { createService } from "../reactive";
import { notifyService } from "./notifyService";

const tagReactor = {
  collection: "tags",
    onSuccess: ({ action, payload, params, db }) => {
      switch (action) {
        case "getTags":
          db.collection("tags").bulkWrite(payload);
          break;
      }
    },
    onError: ({ action }) => {
      let mensaje = "Something went wrong. Please try again.";

      switch (action) {
          case "getTags":
              mensaje = "Failed to load tags. Please check your connection.";
              break;
      }

      notifyService.error(mensaje);
    },
};

export const tagService = createService(tagClient, tagReactor)