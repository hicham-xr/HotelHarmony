
import '../styles/Navbar.css'; // On va définir le style ici

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="site-name">Harmmony-hotel</span>
      </div>
      <div className="navbar-right">
        <a href="/client/dashboard">Nos chambres</a>
        <a href="/client/mes-reservations">Mes réservations</a>
        <button onClick={() => { localStorage.clear(); window.location.href = '/connexion'; }}>Déconnexion</button>
      </div>
    </nav>
  );
};



export default Navbar;
