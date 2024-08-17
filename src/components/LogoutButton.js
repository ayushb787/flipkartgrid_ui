import React from 'react';
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Button
            onClick={handleLogout}
            type="default"
            icon={<PoweroffOutlined />}
            style={{
                border: 'none',
                backgroundColor: 'transparent'
            }}
        />
    );
};

export default LogoutButton;
