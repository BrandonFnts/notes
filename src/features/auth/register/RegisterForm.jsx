import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography } from 'antd';
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
        <Card style={{ width: 384 }}>
            <Typography.Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>Register</Typography.Title>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

                <div style={{ marginTop: 16 }}>
                    <LoadingButton
                        type="submit"
                        label="Register"
                        isLoading={isLoading}
                        className="btn-primary"
                        disabled={!password || !confirmPassword || password !== confirmPassword}
                    />
                </div>
            </form>
            <div style={{ textAlign: 'center', marginTop: 16, fontSize: 14 }}>
                Already have an account? <Link to="/auth/login"><Typography.Link>Login</Typography.Link></Link>
            </div>
        </Card>
    );
};