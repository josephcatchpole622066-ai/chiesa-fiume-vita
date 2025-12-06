import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { eventsData } from '../data/eventsData';
import './Events.css';

function Events() {
  const [filter, setFilter] = useState('tutti');

  const categories = [
    { value: 'tutti', label: 'Tutti gli Eventi', icon: '🔷' },
    { value: 'liturgia', label: 'Liturgia', icon: '⛪' },
    { value: 'giovani', label: 'Giovani', icon: '👥' },
    { value: 'formazione', label: 'Formazione', icon: '📖' }
  ];

  const filteredEvents = filter === 'tutti' 
    ? eventsData 
    : eventsData.filter(event => event.category === filter);

  return (
    <section id="events" className="events">
      <div className="container">
        <h2 className="section-title">Eventi e Attività</h2>
        <p className="section-subtitle">
          Partecipa alla vita della nostra comunità
        </p>

        <div className="filter-buttons">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`filter-btn ${filter === cat.value ? 'active' : ''}`}
              onClick={() => setFilter(cat.value)}
            >
              <span className="filter-icon">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="events-grid">
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-date">
                <div className="event-icon">{event.icon}</div>
                <span className="event-day">{event.date}</span>
                <span className="event-month">{event.month}</span>
              </div>
              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <div className="event-details">
                  <div className="event-detail">
                    <span className="detail-icon">🕐</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="event-detail">
                    <span className="detail-icon">📍</span>
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="event-description">{event.description}</p>
                <Link to={`/events/${event.id}`} className="event-btn">
                  Maggiori Info
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Events;
