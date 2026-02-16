import { noteService } from "./noteService";
import { tagService } from "./tagService";
import { notifyService } from "./notifyService";
import { authService } from "./authService";

export default {
    notes: noteService,
    tags: tagService,
    notify: notifyService,
    auth: authService
}