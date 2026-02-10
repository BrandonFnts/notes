import { noteService } from "./noteService";
import { tagService } from "./tagService";
import { notifyService } from "./notifyService";

export default {
    notes: noteService,
    tags: tagService,
    notify: notifyService
}