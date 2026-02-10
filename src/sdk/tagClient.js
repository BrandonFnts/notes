import api from "./api";

export const tagClient = {
    getTags: async () => {
        return await api.get("/tags");
    },
};