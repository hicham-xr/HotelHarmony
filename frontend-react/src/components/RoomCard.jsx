import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RoomCard.css';

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  // Debug: Log room data to check photo_url
  console.log('RoomCard room:', room);

  const handleDetailsClick = () => {
    navigate(`/reserve/${room.id}`);
  };

  return (
    <div className="room-card">
       <img
            src={room.photo_url || 'https://placehold.co/600x400'}
            alt={room.nom}
            className="room-image"
            onError={(e) => {
              console.log(`Image failed to load for room ${room.id}: ${room.photo_url}`);
              e.target.src = 'https://placehold.co/600x400';
            }}
          />
      <div className="room-content">
        <h2 className="room-title">{room.nom || 'Nom non disponible'}</h2>
        <p className="room-description">{room.description || 'Aucune description'}</p>
        <p className="room-price">
          {room.prix ? `${room.prix} € / nuit` : 'Prix non disponible'}
        </p>
        <button className="details-button" onClick={handleDetailsClick}>
          Plus de détails
        </button>
      </div>
    </div>
  );
};

export default RoomCard;