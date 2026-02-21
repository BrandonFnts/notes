import { RegisterForm } from './RegisterForm';
import { useMonitor } from '@/hooks';
import { services } from '@/services';

export const RegisterController = () => {
    const monitors = useMonitor(["register"]);
    const isLoading = monitors.register;

    const handleRegister = (credentials) => {
        services.auth.register(credentials.email, credentials.password);
    };

    return <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />;
};
