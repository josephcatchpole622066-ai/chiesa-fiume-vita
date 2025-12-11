import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SiteStatistics from './SiteStatistics';
import './AdminDashboard.css';

function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <header className="admin-header">
          <h1>👋 Benvenuto, {user?.username}!</h1>
          <p>Pannello di Amministrazione - Chiesa Fiume di Vita</p>
        </header>

        <div className="admin-cards">
          <Link to="/admin/articles" className="admin-card">
            <div className="card-icon">📝</div>
            <h3>Gestisci Articoli</h3>
            <p>Aggiungi, modifica o elimina articoli</p>
          </Link>

          <div className="admin-card disabled">
            <div className="card-icon">🎬</div>
            <h3>Gestisci Predicazioni</h3>
            <p>Prossimamente disponibile</p>
          </div>

          <div className="admin-card disabled">
            <div className="card-icon">💬</div>
            <h3>Gestisci Testimonianze</h3>
            <p>Prossimamente disponibile</p>
          </div>

          <Link to="/admin/events" className="admin-card">
            <div className="card-icon">📅</div>
            <h3>Gestisci Eventi</h3>
            <p>Crea e modifica eventi della chiesa</p>
          </Link>
        </div>

        {/* Sezione Statistiche */}
        <SiteStatistics />

        <div className="admin-actions">
          <button onClick={logout} className="logout-btn">
            🚪 Esci
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
