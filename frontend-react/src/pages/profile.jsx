

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ClientDashboard.css';


const ClientProfile = () => {
    const [client, setclient] = useState(null);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/auth/client/profile');
                setclient(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données du client:', error);
            }
        };
        fetchClient();
    }, []);

    const handleEditClick = () => {
        alert('Fonction de modification à implémenter !');
    };

    if (!client) {
        return <p>Chargement des informations du profil...</p>;
    }

    return (
        <div className="dashboard-wrapper">
            {/* Barre de navigation */}
            

            {/* Contenu principal */}
            <div className="dashboard-container">
                {/* En-tête */}
                <header className="header">
                    <h1 className="header-title">Profil</h1>
                    <p className="header-greeting">Gérez vos informations personnelles</p>
                </header>

                <div className="grid-container">
                    {/* Section Profil */}
                    <div className="card">
                        <h2 className="card-title">Vos informations</h2>
                        <div className="profile-info">
                            <p><strong>Nom :</strong> {client.nom + ' ' + client.prenom}</p>
                            <p><strong>Email :</strong> {client.email}</p>
                            <button onClick={handleEditClick} className="btn btn-primary">
                                Modifier
                            </button>
                        </div>
                    </div>

                    {/* Section Préférences */}
                    <div className="card">
                        <h2 className="card-title">Préférences de séjour</h2>
                        <p><strong>Type de chambre préféré :</strong></p>
                        <p><strong>Demandes spéciales :</strong> </p>
                        <button className="btn btn-primary">Modifier les préférences</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientProfile;