import React from 'react';
import './NuovaSede.css';

function NuovaSede() {
  return (
    <div className="nuova-sede-page">
      <section className="nuova-sede-hero">
        <div className="container hero-content">
          <h1>🏗️ Il Nostro Nuovo Centro di Culto</h1>
          <p>Un progetto di fede e crescita per la nostra comunità</p>
        </div>
      </section>

      <section className="project-intro">
        <div className="container">
          <div className="intro-content">
            <h2>Una Nuova Casa per la Nostra Chiesa</h2>
            <p className="lead">
              Con grande gioia e gratitudine a Dio, annunciamo il progetto di costruzione 
              della nostra nuova sede a Pozzuoli. Questo spazio rappresenterà un luogo di 
              accoglienza, adorazione e servizio per tutta la comunità.
            </p>
          </div>
        </div>
      </section>

      <section className="project-details">
        <div className="container">
          <div className="details-grid">
            <div className="detail-card">
              <div className="detail-icon">📅</div>
              <h3>Timeline del Progetto</h3>
              <ul>
                <li><strong>Dicembre 2025:</strong> Acquisizione terreno completata</li>
                <li><strong>Gennaio-Marzo 2026:</strong> Progettazione e permessi</li>
                <li><strong>Aprile 2026:</strong> Inizio lavori di costruzione</li>
                <li><strong>Primavera 2026:</strong> Apertura prevista</li>
              </ul>
            </div>

            <div className="detail-card">
              <div className="detail-icon">🏢</div>
              <h3>Caratteristiche della Nuova Sede</h3>
              <ul>
                <li>Sala principale da 400 posti a sedere</li>
                <li>Sale dedicate per bambini e ragazzi</li>
                <li>Aula studio biblico e biblioteca</li>
                <li>Area caffetteria e comunione fraterna</li>
                <li>Uffici amministrativi e pastorali</li>
                <li>Parcheggio gratuito da 200 posti auto</li>
              </ul>
            </div>

            <div className="detail-card">
              <div className="detail-icon">📍</div>
              <h3>Posizione Strategica</h3>
              <p>
                <strong>Via Nuova Speranza, 45<br/>
                80078 Pozzuoli (NA)</strong>
              </p>
              <p>
                La nuova sede si trova in una posizione facilmente accessibile dalla 
                Tangenziale di Napoli (Uscita Pozzuoli), con ampio parcheggio e 
                collegamenti di trasporto pubblico in fase di definizione.
              </p>
              <a 
                href="https://maps.google.com/?q=Via+Nuova+Speranza+45+Pozzuoli" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-map-inline"
              >
                📍 Vedi su Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="vision-section">
        <div className="container">
          <h2>La Nostra Visione</h2>
          <div className="vision-grid">
            <div className="vision-card">
              <div className="vision-icon">🙏</div>
              <h3>Adorazione</h3>
              <p>Uno spazio dedicato alla lode e all'adorazione, dove ogni persona può incontrare Dio in modo personale e comunitario.</p>
            </div>

            <div className="vision-card">
              <div className="vision-icon">👨‍👩‍👧‍👦</div>
              <h3>Famiglia</h3>
              <p>Ambienti pensati per accogliere famiglie, bambini e giovani, favorendo la crescita spirituale di ogni generazione.</p>
            </div>

            <div className="vision-card">
              <div className="vision-icon">🤝</div>
              <h3>Comunità</h3>
              <p>Spazi di incontro e condivisione per rafforzare i legami fraterni e servire insieme il Signore.</p>
            </div>

            <div className="vision-card">
              <div className="vision-icon">🌍</div>
              <h3>Missione</h3>
              <p>Un centro di evangelizzazione e servizio per raggiungere la città di Pozzuoli con il messaggio del Vangelo.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="support-section">
        <div className="container">
          <div className="support-content">
            <h2>Come Puoi Contribuire</h2>
            <p>
              Questo progetto è possibile grazie alla generosità e alla fede della nostra 
              comunità. Se desideri sostenere la costruzione della nuova sede, puoi:
            </p>
            
            <div className="support-options">
              <div className="support-option">
                <div className="support-icon">💰</div>
                <h3>Donazione</h3>
                <p>Contribuisci con un'offerta volontaria per la costruzione</p>
              </div>
              
              <div className="support-option">
                <div className="support-icon">🙏</div>
                <h3>Preghiera</h3>
                <p>Sostieni il progetto con le tue preghiere</p>
              </div>
              
              <div className="support-option">
                <div className="support-icon">🛠️</div>
                <h3>Volontariato</h3>
                <p>Metti a disposizione tempo e competenze</p>
              </div>
            </div>

            <div className="support-cta">
              <p>Per maggiori informazioni su come contribuire:</p>
              <div className="cta-buttons">
                <a href="/contatti" className="btn-primary">Contattaci</a>
                <a href="tel:+393274572078" className="btn-secondary">Chiama Alec</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faith-section">
        <div className="container">
          <div className="faith-quote">
            <blockquote>
              "Se il SIGNORE non costruisce la casa, invano si affaticano i costruttori"
              <cite>— Salmo 127:1</cite>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NuovaSede;
