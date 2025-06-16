import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMoon, FaSun } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserList from './UserList';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={`d-flex flex-column min-vh-100 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />      
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/about" element={<About />} />
            <Route path="/users" element={<UserList />} /> {/* ← Cette ligne utilise UserList */}
          </Routes>
        </div>

        <Footer darkMode={darkMode} />
      </div>
    </Router>
  );
}

export default App;
