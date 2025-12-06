import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Grazie per averci contattato! Ti risponderemo presto.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Contattaci</h2>
        <p className="section-subtitle">
          Siamo qui per te, non esitare a contattarci
        </p>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Indirizzo</h3>
              <p>
                Via Roma, 123
                <br />
                80078 Pozzuoli (NA)
                <br />
                Italia
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Telefono</h3>
              <p>
                +39 081 123 4567
                <br />
                Lun-Ven: 9:00 - 18:00
                <br />
                Sab: 9:00 - 13:00
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">✉️</div>
              <h3>Email</h3>
              <p>
                info@chiesapozzuoli.it
                <br />
                parrocchia@chiesapozzuoli.it
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">⏰</div>
              <h3>Orari Messe</h3>
              <p>
                Feriali: 18:00
                <br />
                Festivi: 10:00, 11:30, 18:00
                <br />
                Domenica: 9:00, 10:30, 12:00, 18:00
              </p>
            </div>

            <div className="social-links">
              <h3>Seguici sui Social</h3>
              <div className="social-icons">
                <a href="#" className="social-icon">
                  📘
                </a>
                <a href="#" className="social-icon">
                  📷
                </a>
                <a href="#" className="social-icon">
                  ▶️
                </a>
                <a href="#" className="social-icon">
                  ✉️
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nome e Cognome *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Il tuo nome"
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
                  placeholder="tua@email.it"
                />
              </div>

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
                <label htmlFor="message">Messaggio *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Come possiamo aiutarti?"
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Invia Messaggio
              </button>
            </form>
          </div>
        </div>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24106.98835394758!2d14.110682!3d40.827082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b0f4a6c2e4f8f%3A0x9f0d84d8c1f9e9a5!2sPozzuoli%2C%20Metropolitan%20City%20of%20Naples%2C%20Italy!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: "20px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mappa Chiesa Pozzuoli"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Contact;
