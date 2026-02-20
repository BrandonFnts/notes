import { createService } from "@/reactive";
import { tokenHelper } from "@/helpers/tokenHelper";
import { authClient } from "@/sdk";
import { notifyService } from "./notifyService";
import { navigate } from "@/helpers/navigate";
import { notifyAuthChange } from "@/context/AuthContext";

const authReactor = {
    collection: "auth",
    onSuccess: ({ action, payload }) => {
        switch (action) {
            case "login": {
                const { accessToken, refreshToken } = payload;
                tokenHelper.setTokens(accessToken, refreshToken);
                notifyService.success("Welcome back.");
                notifyAuthChange();
                navigate("/");
                break;
            }

            case "register":
                notifyService.success("Account created. Please log in.");
                navigate("/auth/login");
                break;
        }
    },
    onError: ({ action }) => {
        let message = "Something went wrong. Please try again.";
        switch (action) {
            case "login":
                message = "Failed to login. Please check your credentials.";
                break;
            case "register":
                message = "Error registering. Please try again.";
                break;
        }
        notifyService.error(message);
    },
};

export const authService = createService(authClient, authReactor);