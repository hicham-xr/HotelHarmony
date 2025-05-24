import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminGestion from './pages/AdminGestion';
import ClientDashboard from './pages/ClientDashboard';
import Reserve from './pages/Reserve';
import MesReservations from './pages/MesReservations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Register />} />
        <Route path="/admin/gestion" element={<AdminGestion />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/reserve/:id" element={<Reserve />} />
        <Route path="/client/mes-reservations" element={<MesReservations />} />
      </Routes>
    </Router>
  );
}

export default App;
