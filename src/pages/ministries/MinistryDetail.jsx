import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MinistryDetail.css';

const MinistryDetail = () => {
  const { ministryId } = useParams();
  const navigate = useNavigate();

  const ministriesData = {
    'calcetto': {
      name: 'Calcetto',
      icon: '⚽',
      color: '#27ae60',
      tagline: 'Sport e Comunione',
      description: 'Il ministero del calcetto offre un momento di svago e comunione attraverso lo sport. Ogni settimana ci ritroviamo per condividere la passione per il calcio, rafforzare i legami fraterni e testimoniare i valori cristiani anche sul campo.',
      schedule: 'Ogni Sabato alle 16:00',
      location: 'Campo sportivo comunale',
      leader: 'Da definire',
      contact: 'calcetto@chiesafiumedivita.it',
      activities: [
        'Partite amichevoli settimanali',
        'Tornei con altre chiese',
        'Momenti di preghiera pre-partita',
        'Eventi speciali per giovani'
      ],
      requirements: 'Aperto a tutti, nessuna esperienza richiesta',
      image: '/images/Calcetto/PXL_20250701_181216695.jpg'
    },
    'donne': {
      name: 'Ministero Donne',
      icon: '👭',
      color: '#e91e63',
      tagline: 'Sorelle nella Fede',
      description: 'Un ministero dedicato alle donne della chiesa, per crescere insieme nella fede, sostenersi a vicenda e scoprire il piano di Dio per le nostre vite. Attraverso studio biblico, preghiera e condivisione, costruiamo relazioni profonde e significative.',
      schedule: 'Ogni Martedì alle 19:30',
      location: 'Chiesa Fiume di Vita',
      leader: 'Sorella Maria',
      contact: 'donne@chiesafiumedivita.it',
      activities: [
        'Studio biblico tematico',
        'Incontri di preghiera',
        'Colazioni di comunione',
        'Seminari su temi femminili',
        'Supporto reciproco'
      ],
      requirements: 'Aperto a tutte le donne',
      image: '/images/Donne/WhatsApp-Image-2025-08-20-at-19.13.51.jpeg'
    },
    'giovanissimi': {
      name: 'Giovanissimi',
      icon: '🎒',
      color: '#9c27b0',
      tagline: 'Medie e Superiori',
      description: 'Un gruppo dinamico per ragazzi e ragazze delle scuole medie e superiori. Insieme esploriamo la fede in modo coinvolgente, affrontiamo le sfide della crescita e costruiamo amicizie durature fondate su Cristo.',
      schedule: 'Ogni Venerdì alle 19:00',
      location: 'Sala Giovani - Chiesa Fiume di Vita',
      leader: 'Pastore Luca',
      contact: 'giovanissimi@chiesafiumedivita.it',
      activities: [
        'Studio biblico interattivo',
        'Giochi e attività di gruppo',
        'Camp estivi',
        'Serate a tema',
        'Progetti di servizio',
        'Musica e worship'
      ],
      requirements: 'Ragazzi delle medie e superiori',
      image: '/images/Giovanissimi/WhatsApp-Image-2025-09-27-at-09.07.37-e1758956932198.jpeg'
    },
    'giovani-famiglie': {
      name: 'Giovani Famiglie',
      icon: '👨‍👩‍👧‍👦',
      color: '#ff9800',
      tagline: 'Insieme come Famiglia',
      description: 'Un ministero pensato per le giovani coppie con figli. Offriamo supporto pratico, condivisione delle esperienze e studio biblico focalizzato sulla famiglia cristiana. Costruiamo insieme famiglie solide fondate sulla Parola di Dio.',
      schedule: 'Ogni primo Sabato del mese alle 17:00',
      location: 'Varie location (a rotazione nelle case)',
      leader: 'Famiglia Rossi',
      contact: 'famiglie@chiesafiumedivita.it',
      activities: [
        'Studio biblico su matrimonio e genitorialità',
        'Pranzi e cene comunitarie',
        'Attività per bambini',
        'Seminari su temi familiari',
        'Supporto reciproco',
        'Eventi ricreativi'
      ],
      requirements: 'Coppie con figli',
      image: '/images/Giovani famiglie/WhatsApp-Image-2025-09-27-at-09.22.43-scaled-e1761038047390.jpeg'
    },
    'chiesa-in-casa': {
      name: 'Chiesa in Casa',
      icon: '🏠',
      color: '#2196f3',
      tagline: 'Comunione nelle Diverse Zone',
      description: 'Incontri settimanali di studio biblico, preghiera e comunione nelle case distribuite in diverse zone del territorio. Un ambiente familiare dove approfondire la fede e costruire relazioni autentiche con i fratelli della tua zona.',
      schedule: 'Vari giorni della settimana secondo la zona',
      location: 'Pozzuoli, Quarto, Monteruscello, Arcofelice',
      leader: 'Vari responsabili di zona',
      contact: 'chiesaincasa@chiesafiumedivita.it',
      activities: [
        'Studio biblico',
        'Preghiera comunitaria',
        'Condivisione testimonianze',
        'Cena fraterna',
        'Supporto reciproco',
        'Evangelizzazione di quartiere'
      ],
      requirements: 'Aperto a tutti',
      image: '/images/Chiesa in casa/WhatsApp-Image-2025-08-20-at-17.15.00-e1757767527844.jpeg',
      locations: [
        {
          name: 'Pozzuoli',
          schedule: 'Ogni Mercoledì alle 20:00',
          leader: 'Da definire',
          contact: 'casapozzuoli@chiesafiumedivita.it'
        },
        {
          name: 'Quarto',
          schedule: 'Ogni Giovedì alle 20:00',
          leader: 'Da definire',
          contact: 'casaquarto@chiesafiumedivita.it'
        },
        {
          name: 'Monteruscello',
          schedule: 'Ogni Martedì alle 20:00',
          leader: 'Da definire',
          contact: 'casamonteruscello@chiesafiumedivita.it'
        },
        {
          name: 'Arcofelice',
          schedule: 'Ogni Lunedì alle 20:00',
          leader: 'Da definire',
          contact: 'casaarcofelice@chiesafiumedivita.it'
        }
      ]
    },
    'uomini': {
      name: 'Incontro Uomini',
      icon: '👨‍👨‍👦',
      color: '#3f51b5',
      tagline: 'Fratelli nella Fede',
      description: 'Un ministero dedicato agli uomini della chiesa. Insieme cresciamo come padri, mariti, fratelli e discepoli di Cristo. Attraverso lo studio della Parola e la condivisione onesta, ci sosteniamo nel cammino di fede.',
      schedule: 'Ogni secondo Sabato del mese alle 08:00',
      location: 'Chiesa Fiume di Vita',
      leader: 'Fratello Giuseppe',
      contact: 'uomini@chiesafiumedivita.it',
      activities: [
        'Studio biblico',
        'Colazione fraterna',
        'Condivisione e accountability',
        'Progetti di servizio',
        'Eventi sportivi',
        'Seminari su paternità e leadership'
      ],
      requirements: 'Aperto a tutti gli uomini',
      image: '/images/Uomini/WhatsApp-Image-2025-08-20-at-19.13.32-e1758956127147.jpeg'
    },
    'scuola-domenicale': {
      name: 'Scuola Domenicale',
      icon: '📚',
      color: '#ffc107',
      tagline: 'Crescere nella Fede',
      description: 'Un programma educativo per bambini dove imparano le storie bibliche, i valori cristiani e crescono nella conoscenza di Gesù attraverso attività creative, canti e giochi.',
      schedule: 'Ogni Domenica alle 10:30 (durante il culto)',
      location: 'Aule Scuola Domenicale - Chiesa Fiume di Vita',
      leader: 'Sorella Anna',
      contact: 'bambini@chiesafiumedivita.it',
      activities: [
        'Storie bibliche interattive',
        'Lavoretti creativi',
        'Canti e musica',
        'Giochi educativi',
        'Versetti da memorizzare',
        'Eventi speciali (Natale, Pasqua)'
      ],
      requirements: 'Bambini 3-12 anni',
      image: '/images/Scuola domenicale/PXL_20250928_101847338-scaled.jpg'
    },
    'aiuto-bisognosi': {
      name: 'Aiuto ai Bisognosi',
      icon: '🤝',
      color: '#f44336',
      tagline: 'Amare il Prossimo',
      description: 'Un ministero dedicato a portare l\'amore pratico di Cristo a chi è nel bisogno. Attraverso distribuzioni alimentari, assistenza materiale e supporto spirituale, incarniamo il Vangelo nella nostra comunità.',
      schedule: 'Attività mensili varie',
      location: 'Varie location sul territorio',
      leader: 'Diacono Marco',
      contact: 'carita@chiesafiumedivita.it',
      activities: [
        'Distribuzione pacchi alimentari',
        'Raccolta vestiti e beni di prima necessità',
        'Visite a domicilio',
        'Supporto economico in emergenze',
        'Collaborazione con enti locali',
        'Progetti di integrazione'
      ],
      requirements: 'Cuore disponibile a servire',
      image: '/images/Aiuto bisognosi/Immagine7-1.png'
    },
    'inglese': {
      name: 'Corso di Inglese',
      icon: '🇬🇧',
      color: '#00bcd4',
      tagline: 'Imparare e Crescere',
      description: 'Lezioni di inglese gratuite per la comunità. Un\'opportunità per imparare la lingua, fare nuove amicizie e, per alcuni, avvicinarsi alla fede cristiana in un ambiente accogliente.',
      schedule: 'Ogni Martedì e Giovedì alle 18:00',
      location: 'Aula Formazione - Chiesa Fiume di Vita',
      leader: 'Teacher Sarah',
      contact: 'inglese@chiesafiumedivita.it',
      activities: [
        'Lezioni di livello base',
        'Lezioni di livello intermedio',
        'Conversazione in inglese',
        'Preparazione certificazioni',
        'Eventi culturali in inglese'
      ],
      requirements: 'Nessun livello richiesto, aperto a tutti',
      image: '/images/Inglese/tips-to-learn-English-blog.webp'
    }
  };

  const ministry = ministriesData[ministryId];

  if (!ministry) {
    return (
      <div className="ministry-detail">
        <div className="container">
          <div className="not-found">
            <h1>Ministero non trovato</h1>
            <button onClick={() => navigate('/ministeri')} className="back-btn">
              Torna ai Ministeri
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ministry-detail">
      <div 
        className="ministry-detail-hero" 
        style={{ 
          '--hero-color': ministry.color,
          backgroundImage: ministry.image ? `url(${ministry.image})` : 'none'
        }}
      >
        <div className="hero-overlay"></div>
        {ministry.image && <div className="hero-image-overlay"></div>}
        <div className="container hero-content">
          <button onClick={() => navigate('/ministeri')} className="back-button">
            ← Tutti i Ministeri
          </button>
          <h1>{ministry.name}</h1>
          <p className="tagline">{ministry.tagline}</p>
        </div>
      </div>

      <div className="container ministry-detail-content">
        <div className="main-content">
          <section className="about-section">
            <h2>Chi Siamo</h2>
            <p>{ministry.description}</p>
          </section>

          <section className="info-cards">
            <div className="info-card">
              <div className="info-icon">📅</div>
              <div className="info-content">
                <h3>Quando</h3>
                <p>{ministry.schedule}</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">📍</div>
              <div className="info-content">
                <h3>Dove</h3>
                <p>{ministry.location}</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">👤</div>
              <div className="info-content">
                <h3>Responsabile</h3>
                <p>{ministry.leader}</p>
              </div>
            </div>
          </section>

          <section className="activities-section">
            <h2>Le Nostre Attività</h2>
            <div className="activities-list">
              {ministry.activities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <span className="check-icon">✓</span>
                  <span>{activity}</span>
                </div>
              ))}
            </div>
          </section>

          {ministry.locations && (
            <section className="locations-section">
              <h2>Le Nostre Località</h2>
              <div className="locations-grid">
                {ministry.locations.map((loc, index) => (
                  <div key={index} className="location-card">
                    <h3>📍 {loc.name}</h3>
                    <div className="location-details">
                      <p><strong>Quando:</strong> {loc.schedule}</p>
                      <p><strong>Responsabile:</strong> {loc.leader}</p>
                      <p><strong>Email:</strong> <a href={`mailto:${loc.contact}`}>{loc.contact}</a></p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="requirements-section">
            <div className="requirements-box">
              <h3>Chi può partecipare?</h3>
              <p>{ministry.requirements}</p>
            </div>
          </section>

          <section className="join-section">
            <div className="join-box" style={{ '--box-color': ministry.color }}>
              <h2>Vuoi unirti a noi?</h2>
              <p>
                Saremo felici di accoglierti! Contattaci per maggiori informazioni 
                o vieni direttamente al prossimo incontro.
              </p>
              <div className="contact-buttons">
                <a href={`mailto:${ministry.contact}`} className="contact-btn primary">
                  Invia una Email
                </a>
                <button onClick={() => navigate('/contatti')} className="contact-btn secondary">
                  Vai ai Contatti
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MinistryDetail;
