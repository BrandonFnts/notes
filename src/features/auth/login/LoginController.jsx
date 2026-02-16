import { LoginForm } from './LoginForm';
import { withReactive } from '@/reactive';

export const LoginController = withReactive(
    ({ services, monitors }) => {
        const isLoading = monitors.login; 

        const handleLogin = (credentials) => {
            services.auth.login(credentials.email, credentials.password);
        };

        return <LoginForm onSubmit={handleLogin} isLoading={isLoading} />;
    },
    {
        init: () => { },
        queries: () => [],
        monitors: () => ["login"],
    }
);