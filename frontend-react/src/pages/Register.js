import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ prenom: '', nom: '', email: '', password: '', password_confirmation: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const url = 'http://localhost:8000/api/auth/client/register';

      const response = await axios.post(url, formData);
      navigate('/connexion');
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors de l\'inscription');
    }
  };

  return (
    <div className="auth-container">
      <header>
        <div className="logo">Hotel Harmony</div>
        <nav>
          <Link to="/" className="btn-accueil">Accueil</Link>
          <Link to="/connexion">Connexion</Link>
          <Link to="/inscription" className="btn-inscription">Inscription</Link>
        </nav>
      </header>
      <div className="auth-box">
        <h2>Inscription</h2>
        <p>Créez votre compte pour réserver vos séjours</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirmer le mot de passe"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
          <button type="submit">S'inscrire</button>
        </form>
        <p>Vous avez déjà un compte ? <Link to="/connexion">Connectez-vous</Link></p>
      </div>
      <footer>
        <center>
          <p>© 2025 Hicham Chakir. Tous droits réservés. | Site conçu pour offrir une expérience unique de réservation.</p>
        </center>
      </footer>
    </div>
  );
};

export default Register;