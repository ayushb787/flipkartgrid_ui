import React from 'react';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, ApiOutlined, SearchOutlined, IssuesCloseOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const { Sider } = Layout;

const Navigation = ({ selectedKey }) => {
    const location = useLocation();
    const path = location.pathname;

    const getSelectedKey = () => {
        switch (path) {
            case '/dashboard':
                return '1';
            case '/discover':
                return '2';
            case '/get-all-api':
                return '3';
            case '/get-issues':
                return '4';
            default:
                return selectedKey || '1';
        }
    };

    return (
        <Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"
                selectedKeys={[getSelectedKey()]}
                style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item key="1" icon={<DashboardOutlined />}>
                    <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<SearchOutlined />}>
                    <Link to="/discover">Discover API</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<ApiOutlined />}>
                    <Link to="/get-all-api">All APIs</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<IssuesCloseOutlined />}>
                    <Link to="/get-issues">Issues</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Navigation;
