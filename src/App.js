import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import FirstPage from '../src/components/FirstPage.js';
import Discover from '../src/components/Discover.js';
import GetAllApi from '../src/components/GetAllApi.js';
import GetIssues from '../src/components/GetIssues.js';
import './App.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/get-all-api" element={<GetAllApi />} />
        <Route path="/get-issues" element={<GetIssues />} />
      </Routes>
    </Router>
    // <BrowserRouter>
    //   <Routes>
        
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;