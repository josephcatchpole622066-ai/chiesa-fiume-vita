import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sermonsData, sermonPlaylists } from '../../data/sermonsData';
import './SermonsPage.css';

function SermonsPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState('tutte');
  const [searchTerm, setSearchTerm] = useState('');

  // Ottieni tutte le date univoche
  const uniqueDates = [...new Set(sermonsData.map(s => s.date))].sort().reverse();

  // Filtra le predicazioni
  const filteredSermons = sermonsData.filter(sermon => {
    const matchesDate = !selectedDate || sermon.date === selectedDate;
    const matchesPlaylist = selectedPlaylist === 'tutte' || sermon.playlist === selectedPlaylist;
    const matchesSearch = !searchTerm || 
      sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDate && matchesPlaylist && matchesSearch;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  return (
    <div className="sermons-page">
      <div className="sermons-hero">
        <div className="sermons-hero-overlay"></div>
        <div className="container sermons-hero-content">
          <h1 className="sermons-title">📖 Predicazioni</h1>
          <p className="sermons-subtitle">
            Ascolta e rileggi le omelie delle nostre celebrazioni
          </p>
        </div>
      </div>

      <div className="container sermons-content">
        <div className="sermons-filters">
          <div className="filter-group">
            <label htmlFor="search">🔍 Cerca</label>
            <input
              id="search"
              type="text"
              placeholder="Cerca per titolo o contenuto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="playlist-filter">🎬 Playlist</label>
            <select
              id="playlist-filter"
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
              className="playlist-select"
            >
              {sermonPlaylists.map(playlist => (
                <option key={playlist.value} value={playlist.value}>
                  {playlist.icon} {playlist.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="date-filter">📅 Filtra per Data</label>
            <select
              id="date-filter"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-select"
            >
              <option value="">Tutte le date</option>
              {uniqueDates.map(date => (
                <option key={date} value={date}>
                  {formatDate(date)}
                </option>
              ))}
            </select>
          </div>

          {(selectedDate || searchTerm || selectedPlaylist !== 'tutte') && (
            <button 
              className="clear-filters-btn"
              onClick={() => {
                setSelectedDate('');
                setSearchTerm('');
                setSelectedPlaylist('tutte');
              }}
            >
              ✕ Pulisci Filtri
            </button>
          )}
        </div>

        <div className="sermons-stats">
          <div className="stat-card">
            <div className="stat-number">{sermonsData.length}</div>
            <div className="stat-label">Predicazioni Totali</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{filteredSermons.length}</div>
            <div className="stat-label">Risultati Trovati</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{sermonsData.reduce((sum, s) => sum + s.views, 0)}</div>
            <div className="stat-label">Visualizzazioni Totali</div>
          </div>
        </div>

        {filteredSermons.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>Nessuna predicazione trovata</h3>
            <p>Prova a modificare i filtri di ricerca</p>
          </div>
        ) : (
          <div className="sermons-grid">
            {filteredSermons.map((sermon) => (
              <Link
                key={sermon.id}
                to={`/sermons/${sermon.id}`}
                className="sermon-card"
              >
                <div className="sermon-card-header">
                  <div className="sermon-date">{formatDate(sermon.date)}</div>
                  <div className="sermon-duration">⏱️ {sermon.duration}</div>
                </div>
                
                <h3 className="sermon-card-title">{sermon.title}</h3>
                
                <div className="sermon-preacher">
                  <span className="preacher-icon">👤</span>
                  {sermon.preacher}
                </div>
                
                <p className="sermon-card-description">{sermon.description}</p>
                
                <div className="sermon-card-footer">
                  <div className="sermon-views">
                    <span className="views-icon">👁️</span>
                    {sermon.views} visualizzazioni
                  </div>
                  <div className="sermon-readings-count">
                    {sermon.readings.length} letture
                  </div>
                </div>
                
                <div className="watch-button">
                  Guarda e Leggi →
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SermonsPage;
