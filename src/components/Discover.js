import React, { useState } from "react";
import './Discover.css';
import { Button, Form, Input, Table, Tag, Spin } from 'antd';

const Discover = () => {
    const [apiName, setApiName] = useState("");
    const [apiUrl, setApiUrl] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);

        try {
            const response = await fetch("http://localhost:7000/apis/discover", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: values.apiName, url: values.apiUrl }),
            });

            const result = await response.json();
            console.log(result);
            setData(result.security_test_results || []);
        } catch (error) {
            console.error("Error fetching data:", error);
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
        <>
        <div className="discover-container">
            <Form
                name="basic"
                layout="vertical" // Changed layout to vertical for a cleaner look
                style={{
                    maxWidth: 600,
                    margin: '0 auto', // Center the form
                }}
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
                    <Input />
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
                    <Input />
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
                        pagination={false} // Disable pagination if not needed
                    />
                </div>
            )}
        </div>
        </>
    );
};

export default Discover;
