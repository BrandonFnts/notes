import { axiosInstance } from "../core/axiosInstance";
import { authClient } from "../authClient";
import { tokenHelper } from "@/helpers/tokenHelper";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

export const responseInterceptor = (response) => {
    return response.data;
};

export const responseErrorInterceptor = async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
    }

    if (isRefreshing) {
        return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
        })
            .then((token) => {
                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                return axiosInstance(originalRequest);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
        const refreshToken = tokenHelper.getRefreshToken();

        if (!refreshToken) throw new Error("No refresh token");

        const response = await authClient.refreshToken(refreshToken);
        const { accessToken, refreshToken: newRefreshToken } = response.data || response;

        tokenHelper.setTokens(accessToken, newRefreshToken);

        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;

        originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;

        processQueue(null, accessToken);

        return axiosInstance(originalRequest);

    } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.clear();
        return Promise.reject(refreshError);
    } finally {
        isRefreshing = false;
    }
};