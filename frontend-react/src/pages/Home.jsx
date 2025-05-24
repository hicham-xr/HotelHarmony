import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header>
        <div className="logo">Hotel Harmony</div>
        <nav>
          <Link to="/connexion" className="btn-outline">Connexion</Link>
          <Link to="/inscription" className="btn-filled">Inscription</Link>
        </nav>
      </header>
      <main>
        <div className="hero">
          <h1>Votre Escapade de <span>Rêve</span> Commence Ici</h1>
          <p>
            Découvrez un confort inégalé, un service exceptionnel et des souvenirs inoubliables.
            Réservez votre séjour dès aujourd'hui.
          </p>
          <Link to="/connexion" className="btn-see-rooms">Voir les Chambres →</Link>
        </div>
        <div className="why-us-section">
  <h2>Pourquoi Nous Choisir ?</h2>
  <div className="reasons">
    <div className="reason">
      <h3>📍 Emplacement Idéal</h3>
      <p>Situé au cœur de la ville, proche de toutes les attractions.</p>
    </div>
    <div className="reason">
      <h3>🛏️ Confort Luxueux</h3>
      <p>Chambres spacieuses et élégamment meublées pour votre bien-être.</p>
    </div>
    <div className="reason">
      <h3>🕒 Service Impeccable</h3>
      <p>Notre équipe dévouée est à votre service 24/7.</p>
    </div>
  </div>
</div>

      </main>
    </div>
  );
};

export default Home;
