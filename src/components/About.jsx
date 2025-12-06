import React from "react";
import "./About.css";

function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">Chi Siamo</h2>
        <p className="section-subtitle">
          Una comunità viva e accogliente nel cuore di Pozzuoli
        </p>

        <div className="about-content">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1545231027-637d2f6210f8?q=80&w=800"
              alt="Chiesa Pozzuoli"
            />
          </div>

          <div className="about-text">
            <h3>La Nostra Missione</h3>
            <p>
              Siamo una comunità cristiana che accoglie tutti con amore e gioia.
              La nostra chiesa a Pozzuoli è un luogo di preghiera, crescita
              spirituale e fraternità, dove ogni persona può trovare pace e
              conforto.
            </p>

            <div className="features">
              <div className="feature">
                <div className="feature-icon">🙏</div>
                <h4>Preghiera</h4>
                <p>Momenti di preghiera comunitaria e personale</p>
              </div>

              <div className="feature">
                <div className="feature-icon">❤️</div>
                <h4>Comunità</h4>
                <p>Una famiglia accogliente e calorosa</p>
              </div>

              <div className="feature">
                <div className="feature-icon">📖</div>
                <h4>Studio</h4>
                <p>Approfondimento della Parola di Dio</p>
              </div>

              <div className="feature">
                <div className="feature-icon">🤝</div>
                <h4>Servizio</h4>
                <p>Aiuto concreto a chi è nel bisogno</p>
              </div>
            </div>
          </div>
        </div>

        <div className="stats">
          <div className="stat">
            <h3>50+</h3>
            <p>Anni di Storia</p>
          </div>
          <div className="stat">
            <h3>500+</h3>
            <p>Membri Attivi</p>
          </div>
          <div className="stat">
            <h3>20+</h3>
            <p>Attività Settimanali</p>
          </div>
          <div className="stat">
            <h3>100%</h3>
            <p>Amore e Dedizione</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
