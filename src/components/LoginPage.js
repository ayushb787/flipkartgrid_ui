import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const { username, password } = values;
            const response = await fetch("/auth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            console.log(data);
            if (data.access_token) {
                localStorage.setItem('token', data.access_token);
                navigate('/dashboard');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Login failed');
            console.error(err);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
            <h2>Login</h2>
            <Form
                name="login"
                onFinish={onFinish}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Login
                    </Button>
                </Form.Item>

                {error && (
                    <Form.Item>
                        <Alert message={error} type="error" showIcon />
                    </Form.Item>
                )}
            </Form>
        </div>
    );
};

export default LoginPage;
