import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, LoadingButton } from '@/components';

export const RegisterForm = ({ onSubmit, isLoading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            return;
        }
        
        onSubmit({ email, password });
    };

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center mb-4">Register</h2>
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
                    <Input
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        error={password !== confirmPassword && confirmPassword ? "Passwords do not match" : null}
                    />

                    <div className="form-control mt-6">
                        <LoadingButton
                            type="submit"
                            label="Register"
                            isLoading={isLoading}
                            className="btn-primary"
                            disabled={!password || !confirmPassword || password !== confirmPassword}
                        />
                    </div>
                </form>
                <div className="text-center mt-4 text-sm">
                    Already have an account? <Link to="/auth/login" className="link link-primary">Login</Link>
                </div>
            </div>
        </div>
    );
};