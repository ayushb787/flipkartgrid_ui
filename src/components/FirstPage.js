import React from 'react';
import flipkart_logo from '../assets/flipkart_logo.png'
import '../components/FirstPage.css';
import { Outlet, Link } from "react-router-dom";
function FirstPage() {

  return (
    <div className="outer-container">
    
    
      <div className="container">
        <img className="logo" id="logo1" src={flipkart_logo} alt="Flipkart Grid Logo" />
        <p className='company-header'>Information Security Challenge</p>
        <img className="logo" id="logo2" src={flipkart_logo} alt="Flipkart Grid Logo" />
      </div>

    </div>
  );
}

export default FirstPage;