import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TestimonialsPage.css';

function TestimonialsDynamic() {
  const [allVideos, setAllVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Carica le testimonianze dal file JSON statico
      const baseUrl = import.meta.env.BASE_URL;
      const response = await fetch(`${baseUrl}data/testimonials.json`);
      if (!response.ok) {
        throw new Error('Failed to load testimonials data');
      }
      const videos = await response.json();
      
      setAllVideos(videos);
    } catch (err) {
      setError('Errore nel caricamento delle testimonianze. Riprova più tardi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filtra in base alla ricerca
  const filteredTestimonials = allVideos.filter(testimonial => {
    const matchesSearch = !searchTerm || 
      testimonial.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  return (
    <div className="testimonials-page">
      <div className="testimonials-hero">
        <div className="testimonials-hero-overlay"></div>
        <div className="container testimonials-hero-content">
          <h1 className="testimonials-title">💬 Testimonianze</h1>
          <p className="testimonials-subtitle">
            Scopri come Dio ha trasformato le vite dei nostri fratelli
          </p>
        </div>
      </div>

      <div className="container testimonials-content">
        <div className="testimonials-filters">
          <div className="filter-group">
            <label htmlFor="search">🔍 Cerca</label>
            <input
              id="search"
              type="text"
              placeholder="Cerca per titolo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {searchTerm && (
            <button 
              className="clear-filters-btn"
              onClick={() => setSearchTerm('')}
            >
              ✕ Pulisci Filtri
            </button>
          )}
        </div>

        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Caricamento testimonianze dal canale YouTube...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>{error}</p>
            <button onClick={loadVideos} className="retry-btn">Riprova</button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="testimonials-count">
              <p>
                {filteredTestimonials.length === 0 
                  ? 'Nessuna testimonianza trovata' 
                  : `${filteredTestimonials.length} testimonianz${filteredTestimonials.length === 1 ? 'a' : 'e'} trovat${filteredTestimonials.length === 1 ? 'a' : 'e'}`
                }
              </p>
            </div>

            <div className="testimonials-grid">
              {filteredTestimonials.map((testimonial) => (
                <Link
                  to={`/testimonials/${testimonial.id}`}
                  key={testimonial.id}
                  className="testimonial-card"
                >
                  <div className="testimonial-thumbnail">
                    <img src={testimonial.thumbnail} alt={testimonial.title} />
                    <div className="play-overlay">
                      <div className="play-button">▶</div>
                    </div>
                  </div>

                  <div className="testimonial-info">
                    <h3 className="testimonial-title">
                      {(() => {
                        if (!testimonial.title.toLowerCase().includes('nati di nuovo')) {
                          return testimonial.title;
                        }
                        let titlePart = testimonial.title.split(':')[1]?.trim() || testimonial.title;
                        // Rimuovi "LA STORIA DI" se presente
                        titlePart = titlePart.replace(/^LA STORIA DI\s+/i, '');
                        // Prendi solo la parte prima di | o -
                        const name = titlePart.split(/[|\-]/)[0]?.trim() || titlePart;
                        return `La storia di ${name}`;
                      })()}
                    </h3>
                    <div className="testimonial-meta">
                      <span className="testimonial-date">
                        📅 {formatDate(testimonial.publishedAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TestimonialsDynamic;
