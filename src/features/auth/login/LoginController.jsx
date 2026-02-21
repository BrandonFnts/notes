import { LoginForm } from './LoginForm';
import { useMonitor } from '@/hooks';
import { services } from '@/services';

export const LoginController = () => {
    const monitors = useMonitor(["login"]);
    const isLoading = monitors.login;

    const handleLogin = (credentials) => {
        services.auth.login(credentials.email, credentials.password);
    };

    return <LoginForm onSubmit={handleLogin} isLoading={isLoading} />;
};