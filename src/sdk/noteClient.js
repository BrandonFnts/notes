import api from "./api";

export const noteClient = {
    getNotes: async () => {
        return await api.get("/notes");
    },

    getNoteById: async (id) => {
        return await api.get(`/notes/${id}`);
    },

    createNote: async (note) => {
        return await api.post("/notes", note);
    },

    updateNote: async (id, note) => {
        return await api.put(`/notes/${id}`, note);
    },

    deleteNote: async (id) => {
        return await api.delete(`/notes/${id}`);
    }
};