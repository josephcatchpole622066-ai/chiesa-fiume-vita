import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./About.css";

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const baseUrl = import.meta.env.BASE_URL;

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

        {/* Nuova sezione Benvenuto */}
        <div className="welcome-section">
          <div className="welcome-image">
            <img
              src={`${baseUrl}images/Generale/chiSiamo.jpg`}
              alt="Chiesa Fiume di Vita"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1545231027-637d2f6210f8?q=80&w=800";
              }}
            />
          </div>

          <div className="welcome-text">
            <h3 className="welcome-title">Benvenuto</h3>
            <p className="welcome-intro">Siamo lieti di averti qui</p>
            
            <p>
              Gesù era un uomo semplice con un piano semplice: far conoscere Dio. 
              Insieme, guardiamo costantemente a Gesù attraverso la Parola di Dio, 
              ispirati a diventare ciò che Dio richiede, in modo da poter dare speranza 
              a coloro che ancora non conoscono l'amore straordinario di Dio.
            </p>
            
            <p>
              Lo facciamo costruendo una comunità radicata nella Bibbia, coltivando 
              profonde amicizie spirituali e facendo del bene nella nostra comunità.
            </p>

            <p>
              Ci riuniamo la domenica mattina in chiesa e i nostri piccoli gruppi 
              si incontrano durante la settimana.
            </p>

            <p>
              Speriamo che ti unirai a noi nella nostra missione di entrare a far 
              parte della grande storia di Dio.
            </p>

            <div className="welcome-buttons">
              <Link to="/chi-siamo" className="btn-primary">
                Chi Siamo
              </Link>
              <Link to="/ministeri/chiesa-in-casa" className="btn-secondary">
                Scopri la Chiesa in Casa
              </Link>
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
