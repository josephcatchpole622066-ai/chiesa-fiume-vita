import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SermonsPage.css';

function SermonsDynamic() {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState('tutte');
  const [selectedPreacher, setSelectedPreacher] = useState('tutti');
  const [dynamicPlaylists, setDynamicPlaylists] = useState([]);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      setError(null);

      // Carica i video dal file JSON statico
      const response = await fetch('/data/sermons.json');
      if (!response.ok) {
        throw new Error('Failed to load sermons data');
      }
      const videos = await response.json();
      
      // Ordina per data (più recenti prima)
      const allSermons = videos.sort((a, b) => 
        new Date(b.publishedAt) - new Date(a.publishedAt)
      );

      setSermons(allSermons);
      
      // Estrai playlist uniche dai video (se disponibili)
      const playlists = [...new Set(allSermons.map(s => s.playlist).filter(Boolean))];
      setDynamicPlaylists(playlists);
    } catch (err) {
      console.error('Errore nel caricamento:', err);
      setError('Errore nel caricamento delle predicazioni');
      setSermons([]);
    } finally {
      setLoading(false);
    }
  };

  // Usa solo playlist dinamiche da YouTube
  const allPlaylists = [
    { value: 'tutte', label: 'Tutte le Predicazioni' },
    ...dynamicPlaylists.map(p => ({ value: p, label: p }))
  ];

  // Filtra per playlist
  const playlistFiltered = selectedPlaylist === 'tutte' 
    ? sermons 
    : sermons.filter(s => s.playlist === selectedPlaylist);

  // Filtra per predicatore
  const preacherFiltered = selectedPreacher === 'tutti'
    ? playlistFiltered
    : playlistFiltered.filter(s => s.preacher === selectedPreacher);

  // Estrai predicatori unici
  const uniquePreachers = ['tutti', ...new Set(sermons.map(s => s.preacher).filter(Boolean))].sort();

  // Estrai date uniche
  const uniqueDates = ['all', ...new Set(preacherFiltered.map(s => {
    const date = new Date(s.publishedAt);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }))].sort().reverse();

  // Filtra per data
  const dateFiltered = selectedDate === 'all'
    ? preacherFiltered
    : preacherFiltered.filter(s => {
        const date = new Date(s.publishedAt);
        const sermonMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        return sermonMonth === selectedDate;
      });

  // Filtra per ricerca
  const searchFiltered = searchTerm.trim() === ''
    ? dateFiltered
    : dateFiltered.filter(s => 
        s.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleClearFilters = () => {
    setSelectedDate('all');
    setSearchTerm('');
    setSelectedPlaylist('tutte');
    setSelectedPreacher('tutti');
  };

  if (loading) {
    return (
      <div className="sermons-page">
        <div className="sermons-hero">
          <div className="container">
            <h1>Le Nostre Predicazioni</h1>
            <p>Ascolta la Parola di Dio predicata con potenza</p>
          </div>
        </div>
        <div className="container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Caricamento predicazioni...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sermons-page">
      <div className="sermons-hero">
        <div className="container">
          <h1>Le Nostre Predicazioni</h1>
          <p>Ascolta la Parola di Dio predicata con potenza</p>
        </div>
      </div>

      <div className="container">
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <div className="sermons-filters">
          <div className="filter-group">
            <label htmlFor="playlist-filter">📚 Playlist:</label>
            <select
              id="playlist-filter"
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
              className="filter-select"
            >
              {allPlaylists.map(playlist => (
                <option key={playlist.value} value={playlist.value}>
                  {playlist.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="preacher-filter">👤 Predicatore:</label>
            <select
              id="preacher-filter"
              value={selectedPreacher}
              onChange={(e) => setSelectedPreacher(e.target.value)}
              className="filter-select"
            >
              {uniquePreachers.map(preacher => (
                <option key={preacher} value={preacher}>
                  {preacher === 'tutti' ? 'Tutti i predicatori' : preacher}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="date-filter">📅 Data:</label>
            <select
              id="date-filter"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="filter-select"
            >
              <option value="all">Tutte le date</option>
              {uniqueDates.filter(d => d !== 'all').map(date => {
                const [year, month] = date.split('-');
                const monthName = new Date(year, month - 1).toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
                return (
                  <option key={date} value={date}>
                    {monthName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="search-filter"> Cerca:</label>
            <input
              type="text"
              id="search-filter"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cerca per titolo..."
              className="filter-input"
            />
          </div>

          <button onClick={handleClearFilters} className="clear-filters-btn">
             Cancella Filtri
          </button>
        </div>

        <div className="sermons-count">
          <p>Trovate {searchFiltered.length} predicazioni</p>
        </div>

        <div className="sermons-grid">
          {searchFiltered.map((sermon) => (
            <Link to={`/sermons/${sermon.id}`} key={sermon.id} className="sermon-card">
              <div className="sermon-thumbnail">
                <img src={sermon.thumbnail} alt={sermon.title} />
                <div className="sermon-play-overlay">
                  <div className="play-button">▶</div>
                </div>
                {sermon.isStatic && (
                  <div className="sermon-badge">📝 Trascrizione</div>
                )}
              </div>
              <div className="sermon-info">
                <h3 className="sermon-title">{sermon.title}</h3>
                {sermon.preacher && <p className="sermon-preacher">👤 {sermon.preacher}</p>}
                {sermon.scripture && <p className="sermon-scripture">📖 {sermon.scripture}</p>}
                <div className="sermon-meta">
                  <span className="sermon-date">📅 {formatDate(sermon.publishedAt)}</span>
                  {sermon.views > 0 && <span className="sermon-views">👁️ {sermon.views.toLocaleString()}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {searchFiltered.length === 0 && (
          <div className="no-results">
            <p>Nessuna predicazione trovata con i filtri selezionati.</p>
            <button onClick={handleClearFilters} className="clear-filters-btn">
              Cancella Filtri
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SermonsDynamic;



