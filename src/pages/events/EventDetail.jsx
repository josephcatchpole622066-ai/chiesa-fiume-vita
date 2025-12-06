import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { eventsData } from '../../data/eventsData';
import './EventDetail.css';

function EventDetail() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = eventsData.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="event-detail-container">
        <div className="container">
          <h2>Evento non trovato</h2>
          <Link to="/" className="back-btn">Torna alla Home</Link>
        </div>
      </div>
    );
  }

  return (
    <section className="event-detail-container">
      <div className="event-detail-hero" style={{ backgroundImage: `url(${event.image})` }}>
        <div className="event-detail-overlay"></div>
        <div className="container event-detail-hero-content">
          <button className="back-button" onClick={() => navigate('/')}>
            ← Torna agli Eventi
          </button>
          <div className="event-icon-large">{event.icon}</div>
          <h1 className="event-detail-title">{event.title}</h1>
          <div className="event-meta">
            <span className="meta-item">
              <span className="meta-icon">📅</span>
              {event.date} {event.month}
            </span>
            <span className="meta-item">
              <span className="meta-icon">🕐</span>
              {event.time}
            </span>
            <span className="meta-item">
              <span className="meta-icon">📍</span>
              {event.location}
            </span>
          </div>
        </div>
      </div>

      <div className="container event-detail-content">
        <div className="event-detail-main">
          <div className="event-detail-section">
            <h2>Descrizione</h2>
            <p className="event-full-description">{event.fullDescription}</p>
          </div>

          {event.program && (
            <div className="event-detail-section">
              <h2>Programma</h2>
              <ul className="event-program">
                {event.program.map((item, index) => (
                  <li key={index} className="program-item">
                    <span className="program-bullet">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="event-detail-section">
            <h2>Come Partecipare</h2>
            <p>
              Non è necessaria alcuna prenotazione. Vieni semplicemente all'ora indicata presso {event.location}.
              Per maggiori informazioni, non esitare a contattarci!
            </p>
          </div>
        </div>

        <div className="event-detail-sidebar">
          <div className="sidebar-card">
            <h3>Informazioni Pratiche</h3>
            <div className="info-list">
              <div className="info-item">
                <strong>Data:</strong>
                <span>{event.date} {event.month}</span>
              </div>
              <div className="info-item">
                <strong>Orario:</strong>
                <span>{event.time}</span>
              </div>
              <div className="info-item">
                <strong>Luogo:</strong>
                <span>{event.location}</span>
              </div>
              <div className="info-item">
                <strong>Categoria:</strong>
                <span className="category-badge">{event.category}</span>
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>Contattaci</h3>
            <p>Per ulteriori informazioni:</p>
            <div className="contact-links">
              <a href="tel:+390811234567" className="contact-link">
                📞 +39 081 123 4567
              </a>
              <a href="mailto:info@chiesapozzuoli.it" className="contact-link">
                ✉️ info@chiesapozzuoli.it
              </a>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>Condividi</h3>
            <div className="share-buttons">
              <button className="share-btn">📘 Facebook</button>
              <button className="share-btn">💬 WhatsApp</button>
              <button className="share-btn">✉️ Email</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="related-events">
          <h2>Altri Eventi</h2>
          <div className="related-events-grid">
            {eventsData.filter(e => e.id !== eventId).slice(0, 3).map((relatedEvent) => (
              <Link key={relatedEvent.id} to={`/events/${relatedEvent.id}`} className="related-event-card">
                <div className="related-event-icon">{relatedEvent.icon}</div>
                <h4>{relatedEvent.title}</h4>
                <p>{relatedEvent.date} {relatedEvent.month}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventDetail;
