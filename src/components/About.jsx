import React, { useEffect, useRef, useState } from "react";
import "./About.css";

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
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
              <div className={`feature ${isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.1s' }}>
                <div className="feature-icon">🙏</div>
                <div className="feature-line"></div>
                <h4>Preghiera</h4>
                <p>Momenti di preghiera comunitaria e personale</p>
              </div>

              <div className={`feature ${isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.3s' }}>
                <div className="feature-icon">❤️</div>
                <div className="feature-line"></div>
                <h4>Comunità</h4>
                <p>Una famiglia accogliente e calorosa</p>
              </div>

              <div className={`feature ${isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.5s' }}>
                <div className="feature-icon">📖</div>
                <div className="feature-line"></div>
                <h4>Studio</h4>
                <p>Approfondimento della Parola di Dio</p>
              </div>

              <div className={`feature ${isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.7s' }}>
                <div className="feature-icon">🤝</div>
                <div className="feature-line"></div>
                <h4>Servizio</h4>
                <p>Aiuto concreto a chi è nel bisogno</p>
              </div>
            </div>
          </div>
        </div>

        <div className="stats">
          <div className={`stat ${isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.2s' }}>
            <h3>50+</h3>
            <p>Anni di Storia</p>
          </div>
          <div className={`stat ${isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.4s' }}>
            <h3>500+</h3>
            <p>Membri Attivi</p>
          </div>
          <div className={`stat ${isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.6s' }}>
            <h3>20+</h3>
            <p>Attività Settimanali</p>
          </div>
          <div className={`stat ${isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.8s' }}>
            <h3>100%</h3>
            <p>Amore e Dedizione</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
