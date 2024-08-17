import React, { useEffect, useState } from 'react';
import { Layout, Typography, Row, Col, Card, Statistic, message } from 'antd';
import { ApiOutlined, IssuesCloseOutlined, CheckCircleOutlined, AppstoreAddOutlined, ExclamationCircleOutlined, AlertOutlined, ThunderboltOutlined } from '@ant-design/icons';
import Navigation from '../components/Navigation';
import LogoutButton from '../components/LogoutButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/Dashboard.css';
import flipkart_logo from '../assets/flipkartGrid.jpg';

const { Content, Footer } = Layout;
const { Title } = Typography;

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalApis: 0,
        uniqueApis: 0,
        openIssues: 0,
        closedIssues: 0,
        highIssues: 0,
        mediumIssues: 0,
        lowIssues: 0
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`/dashboard?token=${token}`);

                setStats({
                    totalApis: response.data.total_apis,
                    uniqueApis: response.data.total_unique_apis,
                    openIssues: response.data.total_open_issues,
                    closedIssues: response.data.total_closed_issues,
                    highIssues: response.data.total_high_severity_issues,
                    mediumIssues: response.data.total_medium_severity_issues,
                    lowIssues: response.data.total_low_severity_issues
                });

                console.log("----------------------");
                console.log(response);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                } else {
                    message.error('Failed to fetch data');
                }
                console.error(error);
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Navigation />
            <Layout style={{ padding: '0 24px', minHeight: '100vh' }}>

                <Content style={{ padding: '24px', margin: 0, minHeight: 280 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
                        <img className="logo" id="logo1" src={flipkart_logo} alt="Flipkart Grid Logo" />
                        <p className="company-header">Information Security Challenge</p>
                    </div>
                    <Title level={2}>Dashboard</Title>
                    <Row gutter={16} style={{ marginBottom: '18px' }}>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Total APIs"
                                    value={stats.totalApis}
                                    prefix={<ApiOutlined />}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Unique APIs"
                                    value={stats.uniqueApis}
                                    prefix={<AppstoreAddOutlined />}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Open Issues"
                                    value={stats.openIssues}
                                    prefix={<IssuesCloseOutlined />}
                                    valueStyle={{ color: '#cf1322' }}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Closed Issues"
                                    value={stats.closedIssues}
                                    prefix={<CheckCircleOutlined />}
                                    valueStyle={{ color: '#3f8600' }}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="High Severity Issues"
                                    value={stats.highIssues}
                                    prefix={<ExclamationCircleOutlined />}
                                    valueStyle={{ color: '#cf1322' }}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Medium Severity Issues"
                                    value={stats.mediumIssues}
                                    prefix={<AlertOutlined />}
                                    valueStyle={{ color: '#faad14' }}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Low Severity Issues"
                                    value={stats.lowIssues}
                                    prefix={<ThunderboltOutlined />}
                                    valueStyle={{ color: '#52c41a' }}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Flipkart Grid 6.0 ©2024 Created by Ayush Bhandari
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
