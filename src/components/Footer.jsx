import React from "react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>✟ Chiesa Pozzuoli</h3>
            <p>
              Una comunità di fede, speranza e amore nel cuore di Pozzuoli.
              Unisciti a noi per crescere insieme nella fede.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-icon">
                📘
              </a>
              <a href="#" className="footer-social-icon">
                📷
              </a>
              <a href="#" className="footer-social-icon">
                ▶️
              </a>
              <a href="#" className="footer-social-icon">
                ✉️
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Link Rapidi</h4>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">Chi Siamo</a>
              </li>
              <li>
                <a href="#gallery">Galleria</a>
              </li>
              <li>
                <a href="#events">Eventi</a>
              </li>
              <li>
                <a href="#contact">Contatti</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Orari Messe</h4>
            <ul>
              <li>
                <strong>Feriali:</strong> 18:00
              </li>
              <li>
                <strong>Sabato:</strong> 10:00, 18:00
              </li>
              <li>
                <strong>Domenica:</strong> 9:00, 10:30, 12:00, 18:00
              </li>
              <li>
                <strong>Confessioni:</strong> Su appuntamento
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contatti</h4>
            <ul>
              <li>📍 Via Roma, 123</li>
              <li>80078 Pozzuoli (NA)</li>
              <li>📞 +39 081 123 4567</li>
              <li>✉️ info@chiesapozzuoli.it</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {currentYear} Chiesa Pozzuoli. Tutti i diritti riservati.
          </p>
          <p>Realizzato con ❤️ per la nostra comunità</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
