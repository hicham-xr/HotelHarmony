import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminGestion.css';

const AdminGestion = () => {
    const [activeTab, setActiveTab] = useState('chambres');
    const [chambres, setChambres] = useState([]);
    const [users, setUsers] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [formData, setFormData] = useState({
        nom: '',
        type: '',
        prix: '',
        capacite: '',
        description: '',
        photo: null,
    });
    const [editingChambre, setEditingChambre] = useState(null);
    const [editFormData, setEditFormData] = useState({
        nom: '',
        type: '',
        prix: '',
        capacite: '',
        description: '',
    });
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchChambres();
        fetchUsers();
        fetchReservations();
    }, []);

    const fetchChambres = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/chambres', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setChambres(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des chambres:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
        }
    };

    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/reservations', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReservations(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des réservations:', error);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'photo') {
            setFormData({ ...formData, photo: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('nom', formData.nom);
        data.append('type', formData.type);
        data.append('prix', formData.prix);
        data.append('nbMaxPersonne', formData.capacite);
        data.append('description', formData.description || '');
        if (formData.photo) {
            data.append('photo', formData.photo);
        }

        try {
            await axios.post('http://localhost:8000/api/chambres', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchChambres();
            setFormData({ nom: '', type: '', prix: '', capacite: '', description: '', photo: null });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la chambre:', error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const data = {
            nom: editFormData.nom,
            type: editFormData.type,
            prix: editFormData.prix,
            nbMaxPersonne: editFormData.capacite,
            description: editFormData.description || '',
        };

        try {
            await axios.put(`http://localhost:8000/api/chambres/${editingChambre.id}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchChambres();
            setEditingChambre(null);
            setEditFormData({ nom: '', type: '', prix: '', capacite: '', description: '' });
        } catch (error) {
            console.error('Erreur lors de la modification de la chambre:', error);
        }
    };

    const handleEditClick = (chambre) => {
        setEditingChambre(chambre);
        setEditFormData({
            nom: chambre.nom || chambre.numero || chambre.id,
            type: chambre.type,
            prix: chambre.prix,
            capacite: chambre.capacite || chambre.nbMaxPersonne,
            description: chambre.description || '',
        });
    };

    const handleCancelEdit = () => {
        setEditingChambre(null);
        setEditFormData({ nom: '', type: '', prix: '', capacite: '', description: '' });
    };

    const handleDeleteChambre = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/chambres/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchChambres();
        } catch (error) {
            console.error('Erreur lors de la suppression de la chambre:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchUsers();
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        }
    };

    const handleReservationStatus = async (id, status) => {
    try {
        const reservation = reservations.find(r => r.id === id);
        if (reservation) {
            if (status === true) {
                // Confirmer la réservation et mettre l'état à 1 (confirmé)
                await axios.put(`http://localhost:8000/api/reservations/${id}`, { etat: 1 }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                
                // Note: Pas besoin de mettre à jour manuellement l'état de la chambre ici
                // Le backend s'en charge dans la méthode updateStatus
            } else {
                // Refuser la réservation (supprimer)
                await axios.delete(`http://localhost:8000/api/reservations/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            // Rafraîchir les données après modification
            fetchReservations();
            fetchChambres();
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut:', error);
    }
};

    return (
        <div className="admin-container">
            <header>
                <div className="logo">Hotel Harmony</div>
                <nav>
                    <button onClick={() => window.location.href = '/'}>Accueil</button>
                    <button onClick={() => { localStorage.clear(); window.location.href = '/connexion'; }}>Déconnexion</button>
                </nav>
            </header>

            <h1>Tableau de bord administrateur</h1>

           

            <div className="tabs">
                <button 
                    className={activeTab === 'chambres' ? 'active' : ''} 
                    onClick={() => setActiveTab('chambres')}
                >
                    Gestion des chambres
                </button>
                <button 
                    className={activeTab === 'utilisateurs' ? 'active' : ''} 
                    onClick={() => setActiveTab('utilisateurs')}
                >
                    Gestion des utilisateurs
                </button>
                <button 
                    className={activeTab === 'reservations' ? 'active' : ''} 
                    onClick={() => setActiveTab('reservations')}
                >
                    Réservations
                </button>
            </div>

            {activeTab === 'chambres' && (
                <section className="section-chambres">
                    <h2>Ajouter une chambre</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="nom">Nom de la chambre</label>
                                <input 
                                    type="text" 
                                    id="nom" 
                                    name="nom" 
                                    value={formData.nom} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="type">Type de chambre</label>
                                <select 
                                    id="type" 
                                    name="type" 
                                    value={formData.type} 
                                    onChange={handleChange} 
                                    required
                                >
                                    <option value="">Sélectionner un type</option>
                                    <option value="Simple">Simple</option>
                                    <option value="Double">Double</option>
                                    <option value="Suite">Suite</option>
                                    <option value="Luxe">Luxe</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="prix">Prix par nuit (€)</label>
                                <input 
                                    type="number" 
                                    id="prix" 
                                    name="prix" 
                                    value={formData.prix} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="capacite">Capacité</label>
                                <input 
                                    type="number" 
                                    id="capacite" 
                                    name="capacite" 
                                    value={formData.capacite} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="photo">Image de la chambre</label>
                            <input 
                                type="file" 
                                id="photo" 
                                name="photo" 
                                accept="image/jpeg,image/png,image/jpg,image/gif"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group description-group">
                            <label htmlFor="description">Description</label>
                            <textarea 
                                id="description" 
                                name="description" 
                                value={formData.description} 
                                onChange={handleChange}
                                rows="4"
                            ></textarea>
                        </div>
                        <div className="form-group submit-group">
                            <button type="submit" className="submit-btn">Ajouter la chambre</button>
                        </div>
                    </form>

                    {editingChambre && (
                        <div className="edit-bar">
                            <div className="edit-header">
                                <h2>Modifier la chambre {editingChambre.nom || editingChambre.numero || editingChambre.id}</h2>
                                <button className="close-btn" onClick={handleCancelEdit}>×</button>
                            </div>
                            <p>Créez une nouvelle chambre pour organiser les ressources pédagogiques.</p>
                            <form onSubmit={handleEditSubmit}>
                                <div className="form-group">
                                    <label htmlFor="edit-nom">Nom de la chambre</label>
                                    <input 
                                        type="text" 
                                        id="edit-nom" 
                                        name="nom" 
                                        value={editFormData.nom} 
                                        onChange={handleEditChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit-type">Catégorie parente</label>
                                    <select 
                                        id="edit-type" 
                                        name="type" 
                                        value={editFormData.type} 
                                        onChange={handleEditChange} 
                                        required
                                    >
                                        <option value="">Sélectionner un type</option>
                                        <option value="Simple">Simple</option>
                                        <option value="Double">Double</option>
                                        <option value="Suite">Suite</option>
                                        <option value="Luxe">Luxe</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit-description">Description</label>
                                    <textarea 
                                        id="edit-description" 
                                        name="description" 
                                        value={editFormData.description} 
                                        onChange={handleEditChange}
                                        rows="4"
                                    >Décrivez brièvement cette chambre...</textarea>
                                </div>
                                <div className="form-group submit-group">
                                    <button type="button" className="cancel-btn" onClick={handleCancelEdit}>Annuler</button>
                                    <button type="submit" className="submit-btn">Enregistrer</button>
                                </div>
                            </form>
                        </div>
                    )}

                    <h2>Liste des chambres</h2>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Type</th>
                                <th>Prix/nuit</th>
                                <th>Capacité</th>
                                <th>Image</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chambres.map(chambre => (
                                <tr key={chambre.id}>
                                    <td>{chambre.nom || chambre.numero || chambre.id}</td>
                                    <td>{chambre.type}</td>
                                    <td>{chambre.prix} €</td>
                                    <td>{chambre.capacite || chambre.nbMaxPersonne}</td>
                                    <td>{chambre.photo || 'Aucune image'}</td>
                                    <td>{chambre.etat === 1 ? 'Indisponible' : 'Disponible'}</td>
                                    <td className="actions-cell">
                                        <button className="action-btn modify" onClick={() => handleEditClick(chambre)}>Modifier</button>
                                        <button className="action-btn delete" onClick={() => handleDeleteChambre(chambre.id)}>Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}

            {activeTab === 'utilisateurs' && (
                <section className="section-utilisateurs">
                    <h2>Liste des utilisateurs</h2>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Date d'inscription</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.nom} {user.prenom}</td>
                                    <td>{user.email}</td>
                                    <td>{user.created_at || '12/04/2025'}</td>
                                    <td>{user.statut || 'Actif'}</td>
                                    <td className="actions-cell">
                                        <button className="action-btn delete" onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}

            {activeTab === 'reservations' && (
                <section className="section-reservations">
                    <div className="notification">
                        Vous avez {reservations.filter(r => !r.etat).length} nouvelles réservations en attente de confirmation.
                    </div>
                    <h2>Réservations en attente</h2>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Client</th>
                                <th>Chambre</th>
                                <th>Arrivée</th>
                                <th>Départ</th>
                                <th>Montant</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.filter(r => !r.etat).map(reservation => (
                                <tr key={reservation.id}>
                                    <td>{reservation.id}</td>
                                    <td>{reservation.client?.nom || 'Inconnu'} {reservation.client?.prenom || ''}</td>
                                    <td>
                                        {reservation.id_chambre} 
                                        ({chambres.find(c => c.id === reservation.id_chambre)?.type || 'N/A'})
                                    </td>
                                    <td>{reservation.dateArrive}</td>
                                    <td>{reservation.dateDepart}</td>
                                    <td>
                                        {(chambres.find(c => c.id === reservation.id_chambre)?.prix || 0) * 
                                        ((new Date(reservation.dateDepart) - new Date(reservation.dateArrive)) / (1000 * 60 * 60 * 24)) || 0} €
                                    </td>
                                    <td className="actions-cell">
                                        <button className="action-btn confirm" onClick={() => handleReservationStatus(reservation.id, true)}>Confirmer</button>
                                        <button className="action-btn delete" onClick={() => handleReservationStatus(reservation.id, false)}>Refuser</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}

            <footer>
                <p>© 2025 Hicham Chakir. Tous droits réservés. | Site conçu pour offrir une expérience unique de réservation.</p>
            </footer>
        </div>
    );
};

export default AdminGestion;