import React, { useState } from "react";
import { Layout, Typography, Form, Input, Button, Table, Tag, Spin } from 'antd';
import Navigation from '../components/Navigation';
import './Discover.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const { Content, Footer } = Layout;
const { Title } = Typography;

const Discover = () => {
    const [apiName, setApiName] = useState("");
    const [apiUrl, setApiUrl] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        setLoading(true);

        const token = localStorage.getItem('token');
        const url = `/apis/discover?token=${token}`;

        try {
            const response = await axios.post(url,
                { name: values.apiName, url: values.apiUrl },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );


            setData(response.data.security_test_results || []);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                console.error("Error fetching data:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'API Inventory ID',
            dataIndex: 'api_inventory_id',
            key: 'api_inventory_id',
        },
        {
            title: 'Endpoint',
            dataIndex: 'endpoint',
            key: 'endpoint',
        },
        {
            title: 'Scan Timestamp',
            dataIndex: 'scan_timestamp',
            key: 'scan_timestamp',
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: 'Broken Auth',
            dataIndex: 'broken_auth',
            key: 'broken_auth',
            render: (text) => (
                <Tag color={text.vulnerable ? 'red' : 'green'}>
                    {text.vulnerable ? 'Vulnerable' : 'Not Vulnerable'}
                </Tag>
            ),
        },
        {
            title: 'BOLA',
            dataIndex: 'bola',
            key: 'bola',
            render: (text) => (
                <Tag color={text.vulnerable ? 'red' : 'green'}>
                    {text.vulnerable ? 'Vulnerable' : 'Not Vulnerable'}
                </Tag>
            ),
        },
        {
            title: 'Excessive Data Exposure',
            dataIndex: 'excessive_data_exposure',
            key: 'excessive_data_exposure',
            render: (text) => (
                <Tag color={text.vulnerable ? 'red' : 'green'}>
                    {text.vulnerable ? 'Vulnerable' : 'Not Vulnerable'}
                </Tag>
            ),
        },
        {
            title: 'Rate Limiting',
            dataIndex: 'rate_limiting',
            key: 'rate_limiting',
            render: (text) => (
                <Tag color={text.rate_limited ? 'red' : 'green'}>
                    {text.rate_limited ? 'Vulnerable' : 'Not Vulnerable'}
                </Tag>
            ),
        },
        {
            title: 'Mass Assignment',
            dataIndex: 'mass_assignment',
            key: 'mass_assignment',
            render: (text) => (
                <Tag color={text.vulnerable ? 'red' : 'green'}>
                    {text.vulnerable ? 'Vulnerable' : 'Not Vulnerable'}
                </Tag>
            ),
        },
        {
            title: 'Security Misconfig',
            dataIndex: 'security_misconfig',
            key: 'security_misconfig',
            render: (text) => (
                <Tag color={text.vulnerable ? 'red' : 'green'}>
                    {text.vulnerable ? 'Vulnerable' : 'Not Vulnerable'}
                </Tag>
            ),
        },
        {
            title: 'Injection',
            dataIndex: 'injection',
            key: 'injection',
            render: (text) => (
                <Tag color={text.some(inj => inj.vulnerable) ? 'red' : 'green'}>
                    {text.some(inj => inj.vulnerable) ? 'Vulnerable' : 'Not Vulnerable'}
                </Tag>
            ),
        },
        {
            title: 'Asset Management',
            dataIndex: 'asset_management',
            key: 'asset_management',
            render: (text) => (
                <Tag color={text.undocumented_endpoints.length > 0 ? 'orange' : 'green'}>
                    {text.undocumented_endpoints.length > 0 ? 'Yes' : 'No'}
                </Tag>
            ),
        },
        {
            title: 'Logging Monitoring',
            dataIndex: 'logging_monitoring',
            key: 'logging_monitoring',
            render: (text) => (
                <Tag color={text.vulnerable ? 'red' : 'green'}>
                    {text.vulnerable ? 'Vulnerable' : 'Not Vulnerable'}
                </Tag>
            ),
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Navigation />
            <Layout style={{ padding: '0 24px', minHeight: '100vh' }}>
                <Content style={{ padding: '24px', margin: 0 }}>
                    <Title level={2}>Discover API</Title>
                    <Form
                        name="basic"
                        layout="vertical"
                        style={{ maxWidth: 600, margin: '0 auto' }}
                        onFinish={handleSubmit}
                        className="forms-container"
                    >
                        <Form.Item
                            label="API Name"
                            name="apiName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the API name!',
                                },
                            ]}
                        >
                            <Input value={apiName} onChange={(e) => setApiName(e.target.value)} />
                        </Form.Item>

                        <Form.Item
                            label="API URL"
                            name="apiUrl"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the API URL!',
                                },
                            ]}
                        >
                            <Input value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Discover API
                            </Button>
                        </Form.Item>
                    </Form>

                    {loading && (
                        <div className="loader-container">
                            <Spin size="large" />
                        </div>
                    )}

                    {!loading && data.length > 0 && (
                        <div className="table-container">
                            <Table
                                dataSource={data}
                                columns={columns}
                                rowKey="id"
                                pagination={false}
                            />
                        </div>
                    )}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Flipkart Grid 6.0 ©2024 Created by Ayush Bhandari
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Discover;
