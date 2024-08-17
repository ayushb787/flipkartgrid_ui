import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Discover from '../src/components/Discover.js';
import GetAllApi from '../src/components/GetAllApi.js';
import GetIssues from '../src/components/GetIssues.js';
import LoginPage from '../src/components/LoginPage.js';
import './App.css';
import Dashboard from "./components/Dashboard.js";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/discover" element={<Discover />} />
        <Route path="/get-all-api" element={<GetAllApi />} />
        <Route path="/get-issues" element={<GetIssues />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;