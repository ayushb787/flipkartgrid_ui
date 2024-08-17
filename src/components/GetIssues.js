import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Menu, Button, Table, Tag, Select, message, Layout, Typography, Form, Input } from 'antd';
import axios from 'axios';
import './GetIssues.css';
import Navigation from '../components/Navigation';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const GetIssues = () => {
    const [items, setItems] = useState([]);
    const [selectedApi, setSelectedApi] = useState(null);
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUniqueApis = async () => {
            try {
                const url = `/unique-apis?token=${token}`;
                const response = await axios.get(url, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const menuItems = response.data.map(api => ({
                    key: api.id,
                    label: `${api.name} - ${api.url}`,
                }));
                setItems(menuItems);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    console.error('Error fetching the API list', error);
                }
            }
        };

        fetchUniqueApis();
    }, [token, navigate]);

    const handleMenuClick = (e) => {
        const apiId = e.key;
        setSelectedApi(apiId);
        fetchIssues(apiId);
    };

    const fetchIssues = async (apiId) => {
        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(`/issues/${apiId}?token=${token}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            setIssues(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                console.error('Error fetching the issues', error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (newStatus) => {
        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            const response = await axios.put(
                `/issues/${selectedApi}/status?token=${token}`,
                null,
                {
                    params: {
                        status: newStatus,
                    },
                }
            );

            if (response.status === 200) {
                message.success('Status updated successfully');
                fetchIssues(selectedApi);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                console.error('Error updating the status', error);
                message.error('Failed to update status');
            }
        } finally {
            setLoading(false);
        }
    };






    const columns = [
        {
            title: 'Endpoint',
            dataIndex: 'endpoint',
            key: 'endpoint',
        },
        {
            title: 'Issue Description',
            dataIndex: 'issue_description',
            key: 'issue_description',
        },
        {
            title: 'Severity',
            dataIndex: 'severity',
            key: 'severity',
            render: (severity) => (
                <Tag color={severity === 'High' ? 'red' : 'orange'}>{severity}</Tag>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <Select
                    defaultValue={status}
                    onChange={(newStatus) => {
                        console.log(`Changing status for issue ID ${record.id} to ${newStatus}`); // Debug log
                        handleStatusChange(newStatus);
                    }}
                >
                    <Option value="open">Open</Option>
                    <Option value="closed">Closed</Option> {/* Ensure this is set correctly */}
                </Select>
            ),
        },
        {
            title: 'Detected Time',
            dataIndex: 'detected_time',
            key: 'detected_time',
        },
    ];

    const menu = (
        <Menu onClick={handleMenuClick} items={items} />
    );

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Navigation />
            <Layout style={{ padding: '0 24px', minHeight: '100vh' }}>
                {/* <Header className="header" style={{ background: '#fff', padding: 0 }}>
                    <div className="logo" />
                </Header> */}
                <Content style={{ padding: '24px', margin: 0 }}>
                    <Title level={2}>All APIs</Title>
                    <div className='issues-container'>
                        <div className='issues-dropdown'>
                            <Dropdown overlay={menu} >
                                <Button>
                                    <Space>
                                        Select an API
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                        </div>
                        <div className="table-container">
                            <Table
                                columns={columns}
                                dataSource={issues}
                                loading={loading}
                                rowKey="id"
                                style={{ marginTop: '20px' }}
                                scroll={{ x: 800 }}  // Make table horizontally scrollable
                            /></div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Flipkart Grid 6.0 ©2024 Created by Ayush Bhandari
                </Footer>
            </Layout>
        </Layout>

    );
};

export default GetIssues;
