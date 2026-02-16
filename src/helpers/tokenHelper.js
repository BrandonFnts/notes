const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const tokenHelper = {
    setTokens: (accessToken, refreshToken) => {
        if (accessToken) {
            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        }
        if (refreshToken) {
            localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        }
    },
    getAccessToken: () => {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    },
    getRefreshToken: () => {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    },
    clearTokens: () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    },
    removeRefreshToken: () => {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
};
