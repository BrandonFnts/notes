import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

export const useAction = ({ 
    action, 
    executeOnInit = true, 
    initialValue = null, 
    key,
    onSuccess = () => {}, 
    onError = () => {} 
}) => {
    const [dbValue, setDbValue] = useLocalStorage(key, initialValue);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (executeOnInit) {
            execute();
        }
    }, []);
    
    const execute = useCallback((...args) => {
        setLoading(true);
        
        action(...args)
            .then((data) => {
                setDbValue(data);
                setLoading(false);
                setError(null);
                onSuccess();
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
                onError();
            });
    }, []);

    return [dbValue, loading, execute, error];
}