import { RegisterForm } from './RegisterForm';
import { withReactive } from '@/reactive';

export const RegisterController = withReactive(
    ({ services, monitors }) => {
        const isLoading = monitors.register;

        const handleRegister = (credentials) => {
            services.auth.register(credentials.email, credentials.password);
        };

        return <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />;
    },
    {
        init: () => {},
        queries: () => [],
        monitors: () => ["register"],
    }
);
