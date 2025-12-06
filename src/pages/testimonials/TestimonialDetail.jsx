import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { testimonialsData, testimonialCategories } from '../../data/testimonialsData';
import './TestimonialDetail.css';

function TestimonialDetail() {
  const { testimonialId } = useParams();
  const navigate = useNavigate();
  const testimonial = testimonialsData.find(t => t.id === testimonialId);

  if (!testimonial) {
    return (
      <div className="testimonial-detail">
        <div className="container">
          <div className="not-found">
            <h2>Testimonianza non trovata</h2>
            <Link to="/testimonials" className="back-link">← Torna alle Testimonianze</Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  const getCategoryInfo = (categoryValue) => {
    return testimonialCategories.find(c => c.value === categoryValue);
  };

  const categoryInfo = getCategoryInfo(testimonial.category);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Guarda questa testimonianza: ${testimonial.title}`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      email: `mailto:?subject=${encodeURIComponent(testimonial.title)}&body=${encodeURIComponent(text + '\n\n' + url)}`
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copiato negli appunti!');
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="testimonial-detail">
      <div className="testimonial-header">
        <div className="container">
          <button onClick={() => navigate(-1)} className="back-button">
            ← Indietro
          </button>
          <div className="testimonial-header-content">
            <div className="testimonial-category-badge">
              {categoryInfo.icon} {categoryInfo.label}
            </div>
            <h1 className="testimonial-main-title">{testimonial.title}</h1>
            <div className="testimonial-header-meta">
              <span className="testimonial-person-name">👤 {testimonial.person}</span>
              <span className="testimonial-date-info">📅 {formatDate(testimonial.date)}</span>
              <span className="testimonial-duration-info">⏱️ {testimonial.duration}</span>
              <span className="testimonial-views-info">👁️ {testimonial.views.toLocaleString()} visualizzazioni</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container testimonial-main-content">
        <div className="testimonial-video-section">
          <div className="video-wrapper">
            <iframe
              src={testimonial.videoUrl}
              title={testimonial.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="testimonial-actions">
            <div className="share-buttons">
              <h3>Condividi questa testimonianza</h3>
              <div className="share-button-group">
                <button onClick={() => handleShare('facebook')} className="share-btn facebook">
                  📘 Facebook
                </button>
                <button onClick={() => handleShare('twitter')} className="share-btn twitter">
                  🐦 Twitter
                </button>
                <button onClick={() => handleShare('whatsapp')} className="share-btn whatsapp">
                  💬 WhatsApp
                </button>
                <button onClick={() => handleShare('email')} className="share-btn email">
                  ✉️ Email
                </button>
                <button onClick={() => handleShare('copy')} className="share-btn copy">
                  🔗 Copia Link
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="testimonial-description-section">
          <h2>📖 La Storia</h2>
          <div className="testimonial-description-text">
            {testimonial.story.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {testimonial.verseReference && (
          <div className="testimonial-verse-section">
            <h2>📜 Versetto di Riferimento</h2>
            <blockquote className="bible-verse">
              <p className="verse-text">"{testimonial.verse}"</p>
              <footer className="verse-reference">— {testimonial.verseReference}</footer>
            </blockquote>
          </div>
        )}

        <div className="related-testimonials">
          <h2>💬 Altre Testimonianze</h2>
          <div className="related-grid">
            {testimonialsData
              .filter(t => t.id !== testimonial.id && t.category === testimonial.category)
              .slice(0, 3)
              .map(related => (
                <Link 
                  to={`/testimonials/${related.id}`} 
                  key={related.id}
                  className="related-card"
                >
                  <div className="related-thumbnail">
                    <img 
                      src={`https://img.youtube.com/vi/${related.videoUrl.split('/').pop()}/hqdefault.jpg`}
                      alt={related.title}
                    />
                    <div className="related-duration">{related.duration}</div>
                  </div>
                  <div className="related-info">
                    <h4>{related.title}</h4>
                    <p>👤 {related.person}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialDetail;
