import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Changement ici
import '../styles/Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Changement ici

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const url = formData.email.includes('@admin')
        ? 'http://localhost:8000/api/auth/admin/login'
        : 'http://localhost:8000/api/auth/client/login';

      const response = await axios.post(url, formData);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      if (response.data.role === 'admin') {
        navigate('/admin/gestion'); // Changement ici
      } else {
        navigate('/client/dashboard'); // Changement ici
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur de connexion');
    }
  };

  return (
    <div className="auth-container">
      <header>
        <div className="logo">Hotel Harmony</div>
        <nav>
          <Link to="/" className="btn-accueil">Accueil</Link>
          <Link to="/connexion" className="btn-connexion">Connexion</Link>
          <Link to="/inscription" className="btn-inscription">Inscription</Link>
        </nav>
      </header>
      <div className="auth-box">
        <h2>Connexion</h2>
        <p>Entrez vos identifiants pour accéder à votre compte</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Se connecter</button>
        </form>
        <p>Mot de passe oublié ?</p>
        <p>Vous n'avez pas de compte ? <Link to="/inscription">Inscrivez-vous</Link></p>
      </div>
      <footer><center>
      <p>&copy; 2025 Hicham Chakir. Tous droits réservés. | Site conçu pour offrir une expérience unique de réservation.</p>
      </center>
      </footer>
    </div>
  );
};

export default Login;
