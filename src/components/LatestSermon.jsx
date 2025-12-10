import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LatestSermon.css';

const LatestSermon = () => {
  const [latestSermon, setLatestSermon] = useState(null);

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL;
    fetch(`${baseUrl}data/sermons.json`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setLatestSermon(data[0]);
        }
      })
      .catch(error => console.error('Error loading sermon:', error));
  }, []);

  if (!latestSermon) return null;

  return (
    <section className="latest-sermon" id="latest-sermon">
      <div className="container">
        <div className="sermon-header">
          <h2>🎬 Ultima Predicazione</h2>
          <p>Ascolta l'ultima parola condivisa nella nostra comunità</p>
        </div>

        <div className="sermon-content">
          <div className="sermon-video">
            <iframe
              src={latestSermon.embedUrl}
              title={latestSermon.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="sermon-info">
            <h3>{latestSermon.mainTitle}</h3>
            <div className="sermon-meta">
              <span className="preacher">👤 {latestSermon.preacher}</span>
              <span className="scripture">📖 {latestSermon.scripture || 'Vari brani'}</span>
              <span className="date">📅 {new Date(latestSermon.publishedAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <p className="sermon-description">{latestSermon.description}</p>
            
            <div className="sermon-actions">
              <Link to={`/sermons/${latestSermon.id}`} className="btn-primary">
                Vedi Dettagli
              </Link>
              <Link to="/sermons" className="btn-secondary">
                Tutte le Predicazioni
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestSermon;
