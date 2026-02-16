import { tokenHelper } from "@/helpers/tokenHelper";

export const requestInterceptor = (config) => {
    const token = tokenHelper.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

export const requestErrorInterceptor = (error) => Promise.reject(error);
