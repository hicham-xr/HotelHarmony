🚀 Hôtel Harmony - Orchestrateur digital des réservations
Hôtel Harmony est une application web moderne pour la gestion de réservations hôtelières, développée avec Laravel (backend) et ReactJS (frontend). Elle utilise Axios pour la communication entre le frontend et le backend via une API RESTful. L’application offre une interface fluide pour consulter les chambres, réserver, et gérer les bookings, avec un panneau d’administration sécurisé pour gérer les chambres et valider les réservations.
Date de dernière mise à jour : 24 mai 2025, 20:29 (UTC+01:00).

🛠️ Technologies utilisées

Laravel – Framework PHP pour le backend
ReactJS – Bibliothèque JavaScript pour le frontend
Axios – Client HTTP pour les requêtes API
MySQL – Base de données relationnelle
CSS – Pour le style de l’interface
HTML – Structure des pages
Node.js & npm – Gestion des dépendances frontend
Composer – Gestion des dépendances PHP


📦 Installation

Cloner le projet

git clone https://github.com/salahzaim330/projet_Hotel_Harmony.git
cd hotel-management


Installer les dépendances


Backend (Laravel) :

cd backend
composer install


Frontend (React) :

cd ../frontend
npm install


Configurer l’environnement


Copier le fichier .env.example vers .env dans le dossier backend :

cp .env.example .env


Configurer la connexion à la base de données dans backend/.env :

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hotel_harmony
DB_USERNAME=your_username
DB_PASSWORD=your_password


Générer la clé d’application

cd backend
php artisan key:generate


Exécuter les migrations (et seeders si besoin)

php artisan migrate --seed


Lancer les serveurs de développement


Backend :

cd backend
php artisan serve


Frontend :

cd frontend
npm run dev


🖥️ Lancer le projet

Backend : http://localhost:8000
Frontend : http://localhost:3000

Accédez à l’application via le frontend à http://localhost:3000. Connectez-vous avec des identifiants par défaut (si seeders utilisés) :

Admin : admin@example.com / password
User : user@example.com / password


✅ Fonctionnalités principales

Pour les utilisateurs (clients) :
Consultation des chambres disponibles avec filtres (type, prix, dates).
Réservation de chambres avec sélecteur de dates via react-datepicker.
Gestion des réservations personnelles (voir/annuler si la date est future).


Pour les administrateurs :
Tableau de bord avec statistiques (réservations, occupation).
Gestion complète des chambres (CRUD : créer, modifier, supprimer).
Validation ou annulation des réservations.


Intégration frontend-backend :
Utilisation d’Axios pour les requêtes API (authentification, récupération des chambres, gestion des réservations).
Gestion des tokens d’authentification via Laravel Sanctum pour sécuriser les requêtes.


Sécurité :
Authentification via Laravel Sanctum avec tokens.
Routes admin protégées par middleware.
Validation des dates pour éviter les réservations invalides.




🚀 Scripts utiles



Commande
Action



npm run dev
Lancer le serveur de développement React (frontend)


npm run build
Compiler les assets React pour production


php artisan serve
Lancer le serveur Laravel (backend)


php artisan migrate
Exécuter les migrations de la base de données


php artisan db:seed
Remplir la base avec des données de test



🗂️ Structure du projet
hotel-management/
├── backend/                    # Backend Laravel
│   ├── app/
│   │   ├── Http/Controllers/   # RoomController, BookingController
│   │   ├── Models/            # Room.php, Booking.php
│   ├── database/migrations/    # Schéma de la base de données
│   ├── routes/api.php         # Définition des routes API
├── frontend/                   # Frontend React
│   ├── public/                # Fichiers publics (index.html, favicon)
│   ├── src/
│   │   ├── pages/             # Pages React
│   │   │   ├── user/          # Rooms.js, MyBookings.js
│   │   │   ├── admin/         # Dashboard.js, AdminRooms.js
│   │   ├── components/        # Composants (BookingForm.js, Navbar.js)
│   │   ├── utils/             # api.js (configuration Axios)
├── README.md                  # Documentation du projet


🎥 Scénario de démonstration

Admin :
Connexion via /login.
Ajout d’une chambre (ex. : "Suite", 200€/nuit) sur /admin/rooms.
Consultation des réservations sur /admin/bookings.


Utilisateur :
Connexion via /login.
Réservation d’une chambre (ex. : Suite du 01/06 au 05/06) sur /rooms.
Annulation de la réservation via /my-bookings.


Admin (suite) :
Validation ou annulation de la réservation sur /admin/bookings.




🤝 Contribuer
Les contributions sont les bienvenues ! Pour contribuer :

Forkez le projet.
Créez une branche (git checkout -b feature/votre-fonctionnalité).
Commitez vos modifications (git commit -m "Ajout de votre fonctionnalité").
Poussez votre branche (git push origin feature/votre-fonctionnalité).
Ouvrez une Pull Request.


📜 Licence
Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
