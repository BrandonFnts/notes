import toast from 'react-hot-toast';

export const notifyService = {
    success: (message) => {
        toast.success(message);
    },
    error: (message) => {
        toast.error(message);
    }
};
