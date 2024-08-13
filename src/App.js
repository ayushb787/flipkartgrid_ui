import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import FirstPage from '../src/components/FirstPage.js';
import Discover from '../src/components/Discover.js';
import './App.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/discover" element={<Discover />} />
      </Routes>
    </Router>
    // <BrowserRouter>
    //   <Routes>
        
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;