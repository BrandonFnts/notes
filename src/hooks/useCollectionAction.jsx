import { useLocalStorage } from '@uidotdev/usehooks';
import { useAction } from './useAction';

export const useCollectionAction = ({ 
    action, 
    executeOnInit = true, 
    initialValue = null, 
    collection,
    onSuccess = () => {}, 
    onError = () => {} 
}) => {
    const [dbValue, setDbValue] = useLocalStorage(collection, initialValue);
    const [loading, execute, error] = useAction({
        action,
        executeOnInit,
        onSuccess: ({ data, payload }) => {
            setDbValue(data);
            onSuccess({ data, payload });
        },
        onError
    });
    
    return [dbValue, loading, execute, error];
}