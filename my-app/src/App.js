import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SmartScheduler from './components/SmartScheduler'; // Import SmartScheduler
import { Container } from '@mui/material';
import { green } from '@mui/material/colors';

function App() {
  return (
    <Container maxWidth="lg">
      <h1 style={{ textAlign: 'center', backgroundColor: green }}>Energy Optimization Platform</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scheduler" element={<SmartScheduler />} /> {/* New route for SmartScheduler */}
      </Routes>
    </Container>
  );
}

export default App;