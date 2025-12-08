import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { eventsData } from '../data/eventsData';
import './Events.css';

function Events() {
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);
  
  // Evento principale selezionato
  const mainEvent = eventsData[selectedEventIndex];
  // Eventi futuri (primi 3, sempre gli stessi)
  const futureEvents = eventsData.slice(0, 3);

  return (
    <section id="events" className="events-figa">
      <div className="container">
        <h2 className="section-title">Prossimi eventi</h2>
        <div className="events-figa-grid">
          {/* Card evento principale */}
          <div className="event-figa-main-card">
            <div className="event-figa-img-wrap">
              <img src={mainEvent.image} alt={mainEvent.title} className="event-figa-img" />
              <div className="event-figa-date-badge">
                <span className="event-figa-date-day">{mainEvent.date}</span>
                <span className="event-figa-date-month">{mainEvent.month}</span>
              </div>
              <div className="event-figa-main-overlay">
                <h3 className="event-figa-title">{mainEvent.title}</h3>
                <div className="event-figa-details">
                  <span className="event-figa-detail">
                    <svg className="event-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {mainEvent.time}
                  </span>
                  <span className="event-figa-detail">
                    <svg className="event-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {mainEvent.location}
                  </span>
                </div>
                <p className="event-figa-description">{mainEvent.description}</p>
                <div className="event-figa-btns">
                  <a href="#" className="event-figa-btn event-figa-btn-primary">Book Now</a>
                  <Link to={`/events/${mainEvent.id}`} className="event-figa-btn">View Details</Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lista eventi futuri */}
          <div className="event-figa-list">
            {futureEvents.map((event, idx) => {
              const originalIdx = eventsData.findIndex(e => e.id === event.id);
              const isSelected = originalIdx === selectedEventIndex;
              return (
                <div 
                  key={event.id} 
                  className={`event-figa-list-card${isSelected ? ' selected' : ''}`}
                  onClick={() => setSelectedEventIndex(originalIdx)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="event-figa-list-content">
                    <h4 className="event-figa-list-title">{event.title}</h4>
                    <div className="event-figa-list-details">
                      <span className="event-figa-list-detail">
                        <svg className="event-icon-svg-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        {event.time}
                      </span>
                      <span className="event-figa-list-detail">
                        <svg className="event-icon-svg-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        {event.location}
                      </span>
                    </div>
                    <p className="event-figa-list-description">{event.description}</p>
                  </div>
                  <div className={`event-figa-list-date-badge${isSelected ? ' selected' : ''}`}>
                    <span className="event-figa-list-date-day">{event.date}</span>
                    <span className="event-figa-list-date-month">{event.month}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="event-figa-discover-wrap">
          <Link to="/events" className="event-figa-discover-btn">Discover All Events</Link>
        </div>
      </div>
    </section>
  );
}

export default Events;
