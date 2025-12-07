import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Qui potresti inviare i dati a un backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="hero-title">Contattaci</h1>
          <p className="hero-subtitle">
            Siamo qui per te. Scrivici, chiamaci o vieni a trovarci!
          </p>
        </div>
      </div>

      <div className="container contact-page-content">
        <div className="contact-grid">
          {/* Info Cards */}
          <div className="contact-info-section">
            <div className="info-card-modern">
              <div className="info-icon-modern">📍</div>
              <div className="info-content-modern">
                <h3>Dove Siamo</h3>
                <p>Via Casalanno, 85</p>
                <p>80010 Cafone (NA)</p>
                <p>Italia</p>
                <a 
                  href="https://www.google.com/maps/search/Via+Casalanno+85+Cafone+NA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="map-link"
                >
                  Apri in Google Maps →
                </a>
              </div>
            </div>

            <div className="info-card-modern">
              <div className="info-icon-modern">📞</div>
              <div className="info-content-modern">
                <h3>Telefono</h3>
                <p><a href="tel:+393274572078">+39 327 457 2078</a></p>
                <p><strong>Riferimento: Alec</strong></p>
              </div>
            </div>

            <div className="info-card-modern">
              <div className="info-icon-modern">✉️</div>
              <div className="info-content-modern">
                <h3>Email</h3>
                <p><a href="mailto:info@chiesafiumedivita.it">info@chiesafiumedivita.it</a></p>
                <p><a href="mailto:pastore@chiesafiumedivita.it">pastore@chiesafiumedivita.it</a></p>
                <p className="response-time">Risposta entro 24-48 ore</p>
              </div>
            </div>

            <div className="info-card-modern">
              <div className="info-icon-modern">⏰</div>
              <div className="info-content-modern">
                <h3>Orari Culti</h3>
                <div className="schedule">
                  <p><strong>Domenica:</strong></p>
                  <p>🙏 Culto principale: 10:30</p>
                  <p>👶 Scuola domenicale: 10:30</p>
                  <br />
                  <p><strong>Mercoledì:</strong></p>
                  <p>📖 Studio biblico: 19:30</p>
                </div>
              </div>
            </div>

            <div className="social-card-modern">
              <h3>Seguici sui Social</h3>
              <p>Resta aggiornato sulle nostre attività</p>
              <div className="social-icons-modern">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn facebook">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                  Instagram
                </a>
                <a href="https://youtube.com/@UCGdxHNQjIRAQJ66S5bCRJlg" target="_blank" rel="noopener noreferrer" className="social-btn youtube">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube
                </a>
                <a href="mailto:info@chiesafiumedivita.it" className="social-btn email">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  Email
                </a>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="contact-form-section">
            <div className="form-header">
              <h2>Inviaci un Messaggio</h2>
              <p>Compila il form e ti risponderemo il prima possibile</p>
            </div>

            {submitted && (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Messaggio inviato con successo!</h3>
                <p>Ti risponderemo al più presto.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form-modern">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nome e Cognome *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Mario Rossi"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="mario.rossi@email.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Telefono</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+39 123 456 7890"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Oggetto *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleziona un'opzione</option>
                    <option value="info">Informazioni generali</option>
                    <option value="prayer">Richiesta di preghiera</option>
                    <option value="ministry">Unirsi a un ministero</option>
                    <option value="visit">Visitare la chiesa</option>
                    <option value="baptism">Battesimo</option>
                    <option value="marriage">Matrimonio</option>
                    <option value="counseling">Consulenza spirituale</option>
                    <option value="other">Altro</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Messaggio *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Scrivi qui il tuo messaggio..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                <span>Invia Messaggio</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <h2>Come Raggiungerci</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d14.1204!3d40.8270!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ5JzM3LjIiTiAxNMKwMDcnMTMuNCJF!5e0!3m2!1sit!2sit!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Chiesa Fiume di Vita - Mappa"
            ></iframe>
          </div>
          <div className="map-directions">
            <h3>🚗 Come arrivare</h3>
            <div className="directions-grid">
              <div className="direction-item">
                <strong>In auto:</strong>
                <p>Tangenziale di Napoli, uscita Pozzuoli-Via Campana. Seguire indicazioni per il centro.</p>
              </div>
              <div className="direction-item">
                <strong>Con i mezzi pubblici:</strong>
                <p>Metropolitana Linea 2 fino a Pozzuoli. Bus linee C1, C2 fermata "Via Roma".</p>
              </div>
              <div className="direction-item">
                <strong>Parcheggio:</strong>
                <p>Disponibile parcheggio gratuito nelle vicinanze della chiesa.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
