import { tagClient } from "@/sdk/tagClient";
import { createService } from "../reactive";

const tagServiceDefinition = {
  collection: "tags",
    onSuccess: ({ action, payload, params, db }) => {

    switch (action) {
      case "getTags":
        db.collection("tags").bulkWrite(payload);
        break;

      default:
        break;
    }
    },

    onError: (error) => {
    console.error("TagService Error:", error);
    },
};

export const tagService = createService(tagClient, tagServiceDefinition)