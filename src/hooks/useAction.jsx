import { useState, useEffect, useCallback } from "react";

export const useAction = ({
    action,
    executeOnInit = false,
    onSuccess = () => {}, 
    onError = () => {} 
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if (executeOnInit) {
            execute();
        }
    }, []);

    const execute = useCallback((...params) => {
        setLoading(true);
        action(...params)
            .then((data) => {
                setLoading(false);
                setError(null);
                onSuccess({ data, payload: params });
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
                onError();
            });
    }, []);

    return [loading, execute, error] ;
}