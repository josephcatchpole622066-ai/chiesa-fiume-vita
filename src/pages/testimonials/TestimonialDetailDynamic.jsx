import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../sermons/SermonDetail.css';
import './TestimonialDetail.css';

// Dati delle persone per le testimonianze
const personsData = {
  // Aggiungi qui i dati delle persone con la chiave come videoId
  // Esempio:
  // 'VIDEO_ID': {
  //   name: 'Nome Cognome',
  //   birthYear: '1990',
  //   birthPlace: 'Roma, Italia',
  //   quote: 'Dio ha cambiato la mia vita completamente',
  //   photo: '/images/testimonials/nome-cognome.jpg'
  // }
};

function TestimonialDetailDynamic() {
  const { testimonialId } = useParams();
  const navigate = useNavigate();
  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allTestimonials, setAllTestimonials] = useState([]);

  useEffect(() => {
    loadTestimonial();
  }, [testimonialId]);

  const loadTestimonial = async () => {
    try {
      setLoading(true);

      // Carica i dati dal file JSON statico
      const baseUrl = import.meta.env.BASE_URL;
      const response = await fetch(`${baseUrl}data/all-videos.json`);
      if (!response.ok) {
        throw new Error('Failed to load videos data');
      }
      const videos = await response.json();
      
      const youtubeVideo = videos.find(v => v.id === testimonialId);
      
      if (youtubeVideo) {
        // Estrai il nome dalla parte dopo "nati di nuovo:"
        let extractedName = 'Testimonianza';
        if (youtubeVideo.title.toLowerCase().includes('nati di nuovo')) {
          let titlePart = youtubeVideo.title.split(':')[1]?.trim() || 'Testimonianza';
          // Rimuovi "LA STORIA DI" se presente
          titlePart = titlePart.replace(/^LA STORIA DI\s+/i, '');
          // Prendi solo la parte prima di | o -
          extractedName = titlePart.split(/[|\-]/)[0]?.trim() || titlePart;
        }
        
        const personData = personsData[testimonialId] || {
          name: extractedName,
          birthYear: null,
          birthPlace: null,
          quote: 'Una vita trasformata da Dio',
          photo: youtubeVideo.thumbnail // Usa thumbnail del video come default
        };

        setTestimonial({
          id: youtubeVideo.id,
          title: youtubeVideo.title,
          date: youtubeVideo.publishedAt,
          person: personData.name,
          birthYear: personData.birthYear,
          birthPlace: personData.birthPlace,
          quote: personData.quote,
          photo: personData.photo,
          description: youtubeVideo.title,
          videoUrl: youtubeVideo.embedUrl,
          views: youtubeVideo.views || 0,
          thumbnail: youtubeVideo.thumbnail
        });
        
        // Carica altre testimonianze dal JSON
        const testimonialsResponse = await fetch(`${baseUrl}data/testimonials.json`);
        if (testimonialsResponse.ok) {
          const allTestimonialsData = await testimonialsResponse.json();
          const otherTestimonials = allTestimonialsData
            .filter(v => v.id !== testimonialId)
            .slice(0, 3)
            .map(v => ({
              id: v.id,
              title: v.title,
              date: v.publishedAt,
              thumbnail: v.thumbnail,
              views: v.views || 0
            }));
          setAllTestimonials(otherTestimonials);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Guarda questa testimonianza: ${testimonial?.title}`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      email: `mailto:?subject=${encodeURIComponent(testimonial?.title)}&body=${encodeURIComponent(text + '\n\n' + url)}`
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copiato negli appunti!');
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="testimonial-detail">
        <div className="container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Caricamento testimonianza...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!testimonial) {
    return (
      <div className="testimonial-detail">
        <div className="container">
          <div className="not-found">
            <h2>Testimonianza non trovata</h2>
            <button onClick={() => navigate('/testimonials')} className="back-button">
              ← Torna alle Testimonianze
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sermon-detail-container">
      <div className="sermon-detail-header">
        <div className="container">
          <button className="back-button" onClick={() => navigate('/testimonials')}>
            ← Torna alle Testimonianze
          </button>

          <div className="sermon-header-content">
            <div className="sermon-meta-info">
              <span className="sermon-date-badge">{formatDate(testimonial.date)}</span>
            </div>

            <h1 className="sermon-detail-title">
              {testimonial.title.toLowerCase().includes('nati di nuovo')
                ? `La storia di ${testimonial.person}`
                : testimonial.title
              }
            </h1>

            <div className="sermon-preacher-info">
              <span className="preacher-icon-large">💬</span>
              <span className="preacher-name">{testimonial.person}</span>
            </div>

            <p className="sermon-detail-description">{testimonial.description}</p>

            <div className="sermon-stats-bar">
              {testimonial.views > 0 && (
                <div className="stat-item">
                  <span className="stat-icon">👁️</span>
                  <span>{testimonial.views.toLocaleString()} visualizzazioni</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container sermon-detail-content">
        <div className="sermon-main">
          <div className="video-container">
            <div className="video-wrapper">
              <iframe
                width="100%"
                height="500"
                src={testimonial.videoUrl}
                title={testimonial.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-info">
              <p>
                📅 Registrata il {formatDate(testimonial.date)}
              </p>
            </div>
          </div>
        </div>

        <div className="sermon-sidebar">
          <div className="sidebar-section person-info-card">
            <div className="person-photo">
              <img src={testimonial.photo} alt={testimonial.person} />
            </div>
            <h3>👤 {testimonial.person}</h3>
            <div className="info-list-vertical">
              {testimonial.birthYear && (
                <div className="info-item-vertical">
                  <strong>Anno di nascita:</strong>
                  <span>{testimonial.birthYear}</span>
                </div>
              )}
              {testimonial.birthPlace && (
                <div className="info-item-vertical">
                  <strong>Luogo di nascita:</strong>
                  <span>{testimonial.birthPlace}</span>
                </div>
              )}
              {testimonial.quote && (
                <div className="person-quote">
                  <p>"{testimonial.quote}"</p>
                </div>
              )}
              <div className="info-item-vertical">
                <strong>Chiesa:</strong>
                <span>Chiesa Fiume di Vita</span>
              </div>
              <div className="info-item-vertical">
                <strong>Data testimonianza:</strong>
                <span>{formatDate(testimonial.date)}</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Condividi</h3>
            <div className="share-buttons-vertical">
              <button className="share-btn-vertical" onClick={() => handleShare('facebook')}>📘 Facebook</button>
              <button className="share-btn-vertical" onClick={() => handleShare('whatsapp')}>💬 WhatsApp</button>
              <button className="share-btn-vertical" onClick={() => handleShare('email')}>📧 Email</button>
              <button className="share-btn-vertical" onClick={() => handleShare('copy')}>🔗 Copia Link</button>
            </div>
          </div>
        </div>
      </div>

      {allTestimonials.length > 0 && (
        <div className="container">
          <div className="related-sermons">
            <h2>Altre Testimonianze</h2>
            <div className="related-sermons-grid">
              {allTestimonials.map((relatedTestimonial) => (
                <div
                  key={relatedTestimonial.id}
                  className="related-sermon-card"
                  onClick={() => navigate(`/testimonials/${relatedTestimonial.id}`)}
                >
                  {relatedTestimonial.thumbnail && (
                    <div className="related-sermon-thumbnail">
                      <img src={relatedTestimonial.thumbnail} alt={relatedTestimonial.title} />
                    </div>
                  )}
                  <div className="related-sermon-content">
                    <div className="related-sermon-date">{formatDate(relatedTestimonial.date)}</div>
                    <h4>
                      {(() => {
                        if (!relatedTestimonial.title.toLowerCase().includes('nati di nuovo')) {
                          return relatedTestimonial.title;
                        }
                        let titlePart = relatedTestimonial.title.split(':')[1]?.trim() || relatedTestimonial.title;
                        // Rimuovi "LA STORIA DI" se presente
                        titlePart = titlePart.replace(/^LA STORIA DI\s+/i, '');
                        // Prendi solo la parte prima di | o -
                        const name = titlePart.split(/[|\-]/)[0]?.trim() || titlePart;
                        return `La storia di ${name}`;
                      })()}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestimonialDetailDynamic;
