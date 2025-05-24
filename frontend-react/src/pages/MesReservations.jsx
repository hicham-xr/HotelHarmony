import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/MesReservations.css';
import Navbar from '../components/navebarre';

const MesReservations = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/connexion');
          return;
        }

        const response = await axios.get('http://localhost:8000/api/mes-reservations', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Reservations data:', response.data);
        setReservations(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement des réservations:', err.response?.data || err.message);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/connexion');
        } else {
          setError(err.response?.data.message || 'Erreur lors du chargement des réservations');
          setLoading(false);
        }
      }
    };
    fetchReservations();
  }, [navigate]);

  const handleCancel = async (reservationId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/mes-reservations/${reservationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(reservations.filter((res) => res.id !== reservationId));
      alert('Réservation annulée avec succès !');
    } catch (err) {
      console.error('Erreur lors de l\'annulation:', err.response?.data || err.message);
      alert(err.response?.data.message || 'Erreur lors de l\'annulation de la réservation');
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="reservations-container">
      <Navbar />
      <h1 className="reservations-title">Mes Réservations</h1>
      {reservations.length === 0 ? (
        <p className="no-reservations">Aucune réservation trouvée.</p>
      ) : (
        <div className="table-wrapper">
          <table className="reservations-table">
            <thead>
              <tr>
                <th>Chambre</th>
                <th>Prix (€/nuit)</th>
                <th>Nombre de personnes</th>
                <th>Arrivée</th>
                <th>Départ</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.chambre?.nom || 'N/A'}</td>
                  <td>{reservation.chambre?.prix ? `${reservation.chambre.prix}` : 'N/A'}</td>
                  <td>{reservation.nbPersonne}</td>
                  <td>{new Date(reservation.dateArrive).toLocaleDateString('fr-FR')}</td>
                  <td>{new Date(reservation.dateDepart).toLocaleDateString('fr-FR')}</td>
                  <td>{reservation.etat ? 'Confirmée' : 'En attente'}</td>
                  <td>
                    <button
                      className="cancel-button"
                      onClick={() => handleCancel(reservation.id)}
                      disabled={reservation.etat}
                    >
                      Annuler
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MesReservations;