// src/components/Layout.js
import React, { useState } from 'react';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import flipkart_logo from '../assets/flipkart_logo.png';
import './FirstPage.css';
import Discover from './Discover'; // Import components
import GetAllApi from './GetAllApi';
import GetIssues from './GetIssues';

const FirstPage = () => {
  const [activeKey, setActiveKey] = useState('1'); // State to manage active tab

  const handleTabChange = (key) => {
    setActiveKey(key); // Update active key when tab is changed
  };

  const renderContent = () => {
    switch (activeKey) {
      case '1':
        return <Discover />;
      case '2':
        return <GetAllApi />;
      case '3':
        return <GetIssues />;
      default:
        return null;
    }
  };

  return (
    <div className="outer-container">
      <div className="container">
        <div className="header-sec">
          <img className="logo" id="logo1" src={flipkart_logo} alt="Flipkart Grid Logo" />
          <p className="company-header">Information Security Challenge</p>
          <img className="logo" id="logo2" src={flipkart_logo} alt="Flipkart Grid Logo" />
        </div>
        {/* Tabs Navigation */}
        <div className='tab-container'>
        <Tabs activeKey={activeKey} onChange={handleTabChange}>
          <Tabs.TabPane
            tab={
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                {/* <AppleOutlined style={{ marginRight: 8 }} /> */}
                Discover
              </div>
            }
            key="1"
          />
          <Tabs.TabPane
            tab={
              <div style={{ display: 'flex', alignItems: 'center' , marginLeft: '10px' }}>
                {/* <AndroidOutlined style={{ marginRight: 8 }} /> */}
                Get All API
              </div>
            }
            key="2"
          />
          <Tabs.TabPane
            tab={
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px'  }}>
                {/* <AndroidOutlined style={{ marginRight: 8 }} /> */}
                Get Issues
              </div>
            }
            key="3"
          />
        </Tabs>
        </div>
      </div>
      <div className="content">{renderContent()}</div> {/* Render the corresponding content based on the active tab */}
    </div>
  );
};

export default FirstPage;
