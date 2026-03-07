import { RegisterForm } from './RegisterForm';
import { withReactive } from '@/reactive';

const RegisterControllerView = ({ monitors, services }) => {
    const handleRegister = (credentials) => {
        services.auth.register(credentials.email, credentials.password);
    };

    return <RegisterForm onSubmit={handleRegister} isLoading={monitors.register} />;
};

export const RegisterController = withReactive(RegisterControllerView, {
    monitors: ["register"],
});
