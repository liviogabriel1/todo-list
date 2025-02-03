import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  // Efeito para aplicar o tema
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`app-container ${darkMode ? 'dark' : ''}`}>
        <Navbar
          token={token}
          handleLogout={handleLogout}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <AnimatePresence mode="wait">
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/register" element={<Register setToken={setToken} />} />
              <Route path="/tasks" element={<TaskList token={token} />} />
            </Routes>
          </main>
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;