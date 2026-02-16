import { createService } from "@/reactive";
import { axiosInstance } from "@/sdk/core/axiosInstance";
import { tokenHelper } from "@/helpers/tokenHelper";
import { authClient } from "@/sdk";
import { notifyService } from "./notifyService";

const authReactor = {
    collection: "auth",
    onSuccess: ({ action, payload }) => {
        switch (action) {
            case "login":
                const { accessToken, refreshToken } = payload;
                tokenHelper.setTokens(accessToken, refreshToken);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                notifyService.success("Welcome back.");
                window.dispatchEvent(new Event("auth:change"));
                window.dispatchEvent(new CustomEvent("app:navigate", { detail: "/" }));
                break;

            case "register":
                notifyService.success("Account created. Please log in.");
                window.dispatchEvent(new CustomEvent("app:navigate", { detail: "/auth/login" }));
                break;
        }
    },
    onError: ({ action }) => {
        let mensaje = "Something went wrong. Please try again.";
        switch (action) {
            case "login":
                mensaje = "Failed to login. Please check your credentials.";
                break;
            case "register":
                mensaje = "Error registering. Please try again.";
                break;
        }
        notifyService.error(mensaje);
    },
};

export const authService = createService(authClient, authReactor);