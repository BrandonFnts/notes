import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography } from 'antd';
import { Input, LoadingButton } from '@/components';

export const LoginForm = ({ onSubmit, isLoading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ email, password });
    };

    return (
        <Card style={{ width: 384 }}>
            <Typography.Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>Login</Typography.Title>
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

                <div style={{ marginTop: 16 }}>
                    <LoadingButton
                        type="submit"
                        label="Login"
                        isLoading={isLoading}
                        className="btn-primary"
                    />
                </div>
            </form>
            <div style={{ textAlign: 'center', marginTop: 16, fontSize: 14 }}>
                Don't have an account? <Link to="/auth/register"><Typography.Link>Register</Typography.Link></Link>
            </div>
        </Card>
    );
};
