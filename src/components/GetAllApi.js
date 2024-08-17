import React, { useEffect, useState } from "react";
import { Table, Spin, Select, Button, Tag, Layout, Typography, Form, Input } from "antd";
import './GetAllApi.css';
import Navigation from '../components/Navigation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const GetAllApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const navigate = useNavigate();

  const fetchData = async (limit, skip) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const url = `http://localhost:7000/apis?limit=${limit}&token=${token}`;

      const response = await axios.get(url, {
        headers: {
        },
      });
      console.log("------------------");
      console.log("Response - ", response.data);
      setData(response.data);
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


  useEffect(() => {
    fetchData(limit, skip);
  }, [limit, skip]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'API Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'API URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Last Scanned',
      dataIndex: 'last_scanned',
      key: 'last_scanned',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Broken Auth',
      key: 'broken_auth',
      render: (text, record) => (
        <Tag color={record.security_test_results[0]?.broken_auth.vulnerable ? 'red' : 'green'}>
          {record.security_test_results[0]?.broken_auth.vulnerable ? 'Vulnerable' : 'Not Vulnerable'}
        </Tag>
      ),
    },
    {
      title: 'BOLA',
      key: 'bola',
      render: (text, record) => (
        <Tag color={record.security_test_results[0]?.bola.vulnerable ? 'red' : 'green'}>
          {record.security_test_results[0]?.bola.vulnerable ? 'Vulnerable' : 'Not Vulnerable'}
        </Tag>
      ),
    },
    {
      title: 'Excessive Data Exposure',
      key: 'excessive_data_exposure',
      render: (text, record) => (
        <Tag color={record.security_test_results[0]?.excessive_data_exposure.vulnerable ? 'red' : 'green'}>
          {record.security_test_results[0]?.excessive_data_exposure.vulnerable ? 'Vulnerable' : 'Not Vulnerable'}
        </Tag>
      ),
    },
    {
      title: 'Rate Limiting',
      key: 'rate_limiting',
      render: (text, record) => (
        <Tag color={record.security_test_results[0]?.rate_limiting.rate_limited ? 'red' : 'green'}>
          {record.security_test_results[0]?.rate_limiting.rate_limited ? 'Vulnerable' : 'Not Vulnerable'}
        </Tag>
      ),
    },
    {
      title: 'Mass Assignment',
      key: 'mass_assignment',
      render: (text, record) => (
        <Tag color={record.security_test_results[0]?.mass_assignment.vulnerable ? 'red' : 'green'}>
          {record.security_test_results[0]?.mass_assignment.vulnerable ? 'Vulnerable' : 'Not Vulnerable'}
        </Tag>
      ),
    },
    {
      title: 'Security Misconfig',
      key: 'security_misconfig',
      render: (text, record) => (
        <Tag color={record.security_test_results[0]?.security_misconfig.vulnerable ? 'red' : 'green'}>
          {record.security_test_results[0]?.security_misconfig.vulnerable ? 'Vulnerable' : 'Not Vulnerable'}
        </Tag>
      ),
    },
    {
      title: 'Injection',
      key: 'injection',
      render: (text, record) => (
        <Tag color={record.security_test_results[0]?.injection.some(inj => inj.vulnerable) ? 'red' : 'green'}>
          {record.security_test_results[0]?.injection.some(inj => inj.vulnerable) ? 'Vulnerable' : 'Not Vulnerable'}
        </Tag>
      ),
    },
    {
      title: 'Asset Management',
      key: 'asset_management',
      render: (text, record) => (
        <Tag color={record.security_test_results[0]?.asset_management.undocumented_endpoints.length > 0 ? 'orange' : 'green'}>
          {record.security_test_results[0]?.asset_management.undocumented_endpoints.length > 0 ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'Logging Monitoring',
      key: 'logging_monitoring',
      render: (text, record) => (
        <Tag color={record.security_test_results[0]?.logging_monitoring.vulnerable ? 'red' : 'green'}>
          {record.security_test_results[0]?.logging_monitoring.vulnerable ? 'Vulnerable' : 'Not Vulnerable'}
        </Tag>
      ),
    },
  ];


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navigation />
      <Layout style={{ padding: '0 24px', minHeight: '100vh' }}>
        {/* <Header className="header" style={{ background: '#fff', padding: 0 }}>
                    <div className="logo" />
                </Header> */}
        <Content style={{ padding: '24px', margin: 0 }}>
          <Title level={2}>All APIs</Title>
          <div className="get-all-api-container">
            <div className="controls">
              <Select
                defaultValue={limit}
                style={{ width: 120 }}
                onChange={(value) => setLimit(value)}
              >
                <Select.Option value={10}>10</Select.Option>
                <Select.Option value={20}>20</Select.Option>
                <Select.Option value={50}>50</Select.Option>
                <Select.Option value={100}>100</Select.Option>
              </Select>
              <Button onClick={() => fetchData(limit, skip)}>Fetch APIs</Button>
            </div>

            {loading ? (
              <div className="loader">
                <Spin size="large" tip="Loading..." />
              </div>
            ) : (
              <div className="table-container">
                <Table dataSource={data} columns={columns} rowKey="id" />
              </div>
            )}
          </div>

          {loading && (
            <div className="loader-container">
              <Spin size="large" />
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

export default GetAllApi;