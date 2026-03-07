import { LoginForm } from './LoginForm';
import { withReactive } from '@/reactive';

const LoginControllerView = ({ monitors, services }) => {
    const handleLogin = (credentials) => {
        services.auth.login(credentials.email, credentials.password);
    };

    return <LoginForm onSubmit={handleLogin} isLoading={monitors.login} />;
};

export const LoginController = withReactive(LoginControllerView, {
    monitors: ["login"],
});