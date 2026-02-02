import axios from "axios";

const BASE_URL = "/api";
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2OTdmYjEzN2M4YWNkYzdkYzcxZDg0ZWQiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzcwMDUzMzEyLCJleHAiOjE3NzAwNTQyMTJ9.CaDmvpJh6X73aPo5_gCGCFVMWPbebnZiPy7yqiVKGHQ";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`
    }
});

export const noteService = {
    // --- NOTES ---
    getNotes: async () => {
        const response = await api.get("/notes");
        console.log("Fetched notes:", response.data);
        return response.data;
    },

    getNoteById: async (id) => {
        const response = await api.get(`/notes/${id}`);
        return response.data;
    },

    createNote: async (note) => {
        console.log("Creating note with data:", note);
        const response = await api.post("/notes", note);
        return response.data;
    },

    updateNote: async (id, note) => {
        const response = await api.put(`/notes/${id}`, note);
        return response.data;
    },

    deleteNote: async (id) => {
        const response = await api.delete(`/notes/${id}`);
        return response.data;
    },

    // --- TAGS ---
    getTags: async () => {
        const response = await api.get("/tags");
        return response.data;
    }
};