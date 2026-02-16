import { createContext, useContext, useState, useEffect } from 'react';
import { axiosInstance } from '@/sdk/core/axiosInstance';
import { tokenHelper } from '@/helpers/tokenHelper';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = () => {
        const token = tokenHelper.getAccessToken();
        if (token) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setIsAuthenticated(true);
        } else {
            delete axiosInstance.defaults.headers.common['Authorization'];
            setIsAuthenticated(false);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        checkAuth();
        window.addEventListener('auth:change', checkAuth);

        return () => window.removeEventListener('auth:change', checkAuth);
    }, []);

    const logout = () => {
        tokenHelper.clearTokens();
        localStorage.clear();
        window.dispatchEvent(new Event("auth:change"));
        window.dispatchEvent(new CustomEvent("app:navigate", { detail: "/auth/login" }));
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, logout }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);