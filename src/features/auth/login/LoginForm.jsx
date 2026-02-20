import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, LoadingButton } from '@/components';

export const LoginForm = ({ onSubmit, isLoading, errors }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ email, password });
    };

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center mb-4">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="form-control mt-6">
                        <LoadingButton
                            type="submit"
                            label="Login"
                            isLoading={isLoading}
                            className="btn-primary"
                        />
                    </div>
                </form>
                <div className="text-center mt-4 text-sm">
                    Don't have an account? <Link to="/auth/register" className="link link-primary">Register</Link>
                </div>
            </div>
        </div>
    );
};
