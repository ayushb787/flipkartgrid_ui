import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Menu, Button, Table, Tag, Select, message } from 'antd';
import axios from 'axios';
import './GetIssues.css';
const { Option } = Select;

const GetIssues = () => {
    const [items, setItems] = useState([]);
    const [selectedApi, setSelectedApi] = useState(null);
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:7000/unique-apis')
            .then(response => {
                const menuItems = response.data.map(api => ({
                    key: api.id,
                    label: `${api.name} - ${api.url}`,
                }));
                setItems(menuItems);
            })
            .catch(error => {
                console.error('Error fetching the API list', error);
            });
    }, []);

    const handleMenuClick = (e) => {
        const apiId = e.key;
        setSelectedApi(apiId);
        fetchIssues(apiId);
    };

    const fetchIssues = (apiId) => {
        setLoading(true);
        axios.get(`http://localhost:7000/issues/${apiId}`)
            .then(response => {
                setIssues(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching the issues', error);
                setLoading(false);
            });
    };
    const handleStatusChange = async (newStatus) => {
        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:7000/issues/${selectedApi}/status`, null, {
                params: {
                    status: newStatus, // 'open' or 'closed'
                },
            });
            if (response.status === 200) {
                message.success('Status updated successfully');
                fetchIssues(selectedApi); // Re-fetch the issues to ensure the status is updated
            }
        } catch (error) {
            console.error('Error updating the status', error);
            message.error('Failed to update status');
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
    );
};

export default GetIssues;
