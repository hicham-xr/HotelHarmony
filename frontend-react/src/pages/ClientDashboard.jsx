import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ClientDashboard.css';
import RoomCard from '../components/RoomCard';
import Navbar from '../components/navebarre';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const roomsResponse = await axios.get('http://localhost:8000/api/chambres', {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Log the full API response for debugging
        console.log('API Response:', roomsResponse.data);
        // Filter rooms where etat = 0
        const filteredRooms = roomsResponse.data.filter((room) => room.etat === 0);
        console.log('Filtered Rooms:', filteredRooms);
        setRooms(filteredRooms);

        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          const errorMessage = err.response
            ? `Erreur ${err.response.status}: ${err.response.data.message || 'Erreur serveur'}`
            : `Erreur réseau: ${err.message}`;
          setError(errorMessage);
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Chargement des chambres...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <h1 className="header-title">Nos Chambres</h1>
      {rooms.length === 0 ? (
        <p className="no-rooms">Aucune chambre disponible pour le moment.</p>
      ) : (
        <div className="rooms-grid">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;