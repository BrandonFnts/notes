import api from "./api";

export const authClient = {
    login: async (email, password) => {
        return await api.post("/auth/login", { email, password });
    },
    register: async (email, password) => {
        return await api.post("/auth/register", { email, password });
    },
    refresh: async (refreshToken) => {
        return await api.post("/auth/refresh", { refreshToken });
    },
};
