import React from 'react';
import './Unisciti.css';

function Unisciti() {
  return (
    <div className="unisciti-page">
      <section className="unisciti-hero">
        <div className="container hero-content">
          <h1>Unisciti a Noi</h1>
          <p>Vieni a trovarci e scopri la nostra comunità</p>
        </div>
      </section>

      <section className="locations-section">
        <div className="container">
          <div className="locations-grid">
            {/* Sede Attuale */}
            <div className="location-card current">
              <div className="card-badge">Sede Attuale</div>
              <div className="card-icon">⛪</div>
              <h2>Chiesa Fiume di Vita</h2>
              <h3>Pozzuoli Centro</h3>
              
              <div className="location-info">
                <div className="info-item">
                  <span className="icon">📍</span>
                  <div>
                    <strong>Indirizzo</strong>
                    <p>Via Casalanno, 85<br/>80010 Cafone (NA)</p>
                  </div>
                </div>

                <div className="info-item">
                  <span className="icon">🕐</span>
                  <div>
                    <strong>Orari Culto</strong>
                    <p>Domenica: 10:15<br/>Mercoledì: 19:00</p>
                  </div>
                </div>

                <div className="info-item">
                  <span className="icon">📞</span>
                  <div>
                    <strong>Contatti</strong>
                    <p>+39 327 457 2078 (Alec)<br/>info@chiesafiumedivita.it</p>
                  </div>
                </div>
              </div>

              <a 
                href="https://maps.google.com/?q=Via+Casalanno+85+Cafone+NA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-map"
              >
                📍 Apri in Google Maps
              </a>
            </div>

            {/* Nuova Sede */}
            <div className="location-card future">
              <div className="card-badge future-badge">Prossima Apertura</div>
              <div className="card-icon">🏗️</div>
              <h2>Nuovo Centro di Culto</h2>
              <h3>Pozzuoli - Zona Industriale</h3>
              
              <div className="location-info">
                <div className="info-item">
                  <span className="icon">📍</span>
                  <div>
                    <strong>Indirizzo</strong>
                    <p>Via Nuova Speranza, 45<br/>80078 Pozzuoli (NA)</p>
                  </div>
                </div>

                <div className="info-item">
                  <span className="icon">🎯</span>
                  <div>
                    <strong>Apertura Prevista</strong>
                    <p>Primavera 2026</p>
                  </div>
                </div>

                <div className="info-item">
                  <span className="icon">✨</span>
                  <div>
                    <strong>Caratteristiche</strong>
                    <p>• Sala principale 400 posti<br/>• Sale per bambini e giovani<br/>• Area caffetteria<br/>• Ampio parcheggio gratuito</p>
                  </div>
                </div>
              </div>

              <a 
                href="/nuova-sede"
                className="btn-map"
              >
                🏗️ Scopri il Progetto
              </a>
            </div>
          </div>

          <div className="visit-info">
            <h2>💬 Vuoi Maggiori Informazioni?</h2>
            <p>Saremo felici di accoglierti! Contattaci per qualsiasi domanda o per organizzare una visita.</p>
            <div className="visit-buttons">
              <a href="/contatti" className="btn-primary">✉️ Contattaci</a>
              <a href="tel:+390811234567" className="btn-secondary">📞 Chiamaci</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Unisciti;
