import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Reserve.css';
import Navbar from '../components/navebarre';

const Reserve = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
  });
 

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/connexion');
          return;
        }


       
        
        const response = await axios.get(`http://localhost:8000/api/chambres/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Room data:', response.data);
        setRoom(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement de la chambre:', err.response?.data || err.message);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/connexion');
        } else {
          setError(err.response?.data.message || 'Erreur lors du chargement de la chambre');
          setLoading(false);
        }
      }
    };
    fetchRoom();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const payload = {
        id_chambre: id,
        dateArrive: formData.checkIn,
        dateDepart: formData.checkOut,
        nbPersonne: parseInt(formData.guests),
      };
      console.log('Submitting reservation:', payload);
      const response = await axios.post(
        'http://localhost:8000/api/reservations',
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Reservation response:', response.data);
      alert('Réservation effectuée avec succès !');
      navigate('/client/dashboard');
    } catch (err) {
      console.error('Erreur lors de la réservation:', err.response?.data || err.message);
      alert(err.response?.data.message || 'Erreur lors de la réservation');
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!room) return <div className="error">Chambre non trouvée</div>;

  return (
    <div className="reserve-container">
      <Navbar />
      <h1 className="reserve-title">{room.nom}</h1>
      <div className="reserve-content">
        <div className="room-details">
          <img
            src={room.photo_url || 'https://placehold.co/600x400'}
            alt={room.nom}
            className="room-image"
            onError={(e) => {
              console.log(`Image failed to load for room ${room.id}: ${room.photo_url}`);
              e.target.src = 'https://placehold.co/600x400';
            }}
          />
          <p className="room-description">{room.description || 'Aucune description disponible'}</p>
          <p className="room-price">{room.prix ? `${room.prix} € / nuit` : 'Prix non disponible'}</p>
          <div className="room-features">
            <h3>Équipements</h3>
            <ul>
              <li>Wi-Fi: Oui</li>
              <li>TV: Oui</li>
              <li>Type: {room.type || 'Non spécifié'}</li>
              <li>Capacité: {room.nbMaxPersonne} personne(s)</li>
            </ul>
          </div>
        </div>
        <div className="reservation-form">
          <h3>Réserver cette chambre</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="checkIn">Date d'arrivée</label>
              <input
                type="date"
                id="checkIn"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="checkOut">Date de départ</label>
              <input
                type="date"
                id="checkOut"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleInputChange}
                min={formData.checkIn || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="guests">Nombre de personnes</label>
              <input
                type="number"
                id="guests"
                name="guests"
                min="1"
                max={room.nbMaxPersonne}
                value={formData.guests}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Réserver
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reserve;