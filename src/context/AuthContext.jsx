import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { tokenHelper } from '@/helpers/tokenHelper';
import { navigate } from '@/helpers/navigate';

const AuthContext = createContext(null);

let _notifyAuthChange = () => { };

export const notifyAuthChange = () => _notifyAuthChange();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = useCallback(() => {
        const token = tokenHelper.getAccessToken();
        setIsAuthenticated(!!token);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        checkAuth();
        _notifyAuthChange = checkAuth;

        return () => { _notifyAuthChange = () => { }; };
    }, [checkAuth]);

    const logout = () => {
        tokenHelper.clearTokens();
        localStorage.clear();
        setIsAuthenticated(false);
        navigate("/auth/login");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, logout }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);