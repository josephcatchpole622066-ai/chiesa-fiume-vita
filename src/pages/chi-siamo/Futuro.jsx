import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Futuro.css';

const Futuro = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timeline = timelineRef.current;
      const timelineRect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const timelineTop = timelineRect.top;
      const timelineHeight = timelineRect.height;
      
      let scrollProgress = 0;
      
      if (timelineTop < windowHeight && timelineTop + timelineHeight > 0) {
        const visibleTop = Math.max(0, windowHeight - timelineTop);
        const visibleHeight = Math.min(timelineHeight, visibleTop);
        scrollProgress = (visibleHeight / timelineHeight) * 100;
      }
      
      const timelineLine = timeline.querySelector('.future-timeline-line-progress');
      if (timelineLine) {
        timelineLine.style.height = `${Math.min(scrollProgress, 100)}%`;
      }

      const items = timeline.querySelectorAll('.future-phase-item');
      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height / 2;
        
        if (itemCenter < windowHeight * 0.8) {
          item.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="futuro-page">
      {/* Hero Section */}
      <section className="futuro-hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="hero-title">Il Nostro Futuro</h1>
          <p className="hero-subtitle">Un nuovo spazio per la nostra comunità</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="futuro-intro">
        <div className="container">
          <div className="intro-content">
            <h2>Una Visione che Diventa Realtà</h2>
            <p className="intro-text">
              Stiamo costruendo più di un edificio - stiamo creando uno spazio dove 
              la nostra comunità potrà crescere, adorare e servire insieme. Il progetto 
              della nostra nuova chiesa polifunzionale rappresenta un passo importante 
              nel futuro della Chiesa Fiume di Vita.
            </p>
          </div>
        </div>
      </section>

      {/* Project Vision */}
      <section className="project-vision">
        <div className="container">
          <div className="vision-grid">
            <div className="vision-card">
              <div className="vision-icon">🏛️</div>
              <h3>Spazio Moderno</h3>
              <p>
                Un edificio progettato per accogliere la nostra comunità in crescita, 
                con spazi funzionali e accoglienti per tutte le attività.
              </p>
            </div>
            
            <div className="vision-card">
              <div className="vision-icon">👥</div>
              <h3>Centro Comunitario</h3>
              <p>
                Uno spazio multifunzionale per eventi, incontri di gruppo, 
                attività giovanili e servizi alla comunità locale.
              </p>
            </div>
            
            <div className="vision-card">
              <div className="vision-icon">🌟</div>
              <h3>Casa di Preghiera</h3>
              <p>
                Un luogo dedicato all'adorazione, alla preghiera e all'insegnamento 
                della Parola di Dio per le generazioni future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline del Progetto */}
      <section className="project-timeline">
        <div className="container">
          <h2>Il Percorso del Progetto</h2>
          
          <div className="future-timeline" ref={timelineRef}>
            <div className="future-timeline-line-progress"></div>
            
            <div className="future-phase-item completed">
              <div className="phase-marker"></div>
              <div className="phase-content">
                <span className="phase-status">Completato</span>
                <h3>Fase 1: Visione e Pianificazione</h3>
                <p className="phase-date">2023</p>
                <p>
                  Definizione della visione, studi di fattibilità e progettazione 
                  iniziale con architetti e ingegneri.
                </p>
              </div>
            </div>

            <div className="future-phase-item completed">
              <div className="phase-marker"></div>
              <div className="phase-content">
                <span className="phase-status">Completato</span>
                <h3>Fase 2: Acquisizione Terreno</h3>
                <p className="phase-date">2024</p>
                <p>
                  Identificazione e acquisizione del terreno ideale per la costruzione 
                  del nuovo edificio.
                </p>
              </div>
            </div>

            <div className="future-phase-item in-progress">
              <div className="phase-marker"></div>
              <div className="phase-content">
                <span className="phase-status">In Corso</span>
                <h3>Fase 3: Permessi e Progettazione Definitiva</h3>
                <p className="phase-date">2025</p>
                <p>
                  Ottenimento dei permessi di costruzione e finalizzazione dei 
                  progetti esecutivi.
                </p>
              </div>
            </div>

            <div className="future-phase-item">
              <div className="phase-marker"></div>
              <div className="phase-content">
                <span className="phase-status">Pianificato</span>
                <h3>Fase 4: Inizio Costruzione</h3>
                <p className="phase-date">2026</p>
                <p>
                  Avvio dei lavori di costruzione della struttura principale 
                  e delle fondamenta.
                </p>
              </div>
            </div>

            <div className="future-phase-item">
              <div className="phase-marker"></div>
              <div className="phase-content">
                <span className="phase-status">Pianificato</span>
                <h3>Fase 5: Completamento e Inaugurazione</h3>
                <p className="phase-date">2027</p>
                <p>
                  Finalizzazione dei lavori, allestimento degli spazi interni e 
                  grande inaugurazione della nuova sede.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="project-features">
        <div className="container">
          <h2>Caratteristiche del Nuovo Edificio</h2>
          
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-number">1</div>
              <h3>Sala Principale</h3>
              <p>
                Una sala di culto moderna con capacità per 500+ persone, 
                dotata di tecnologia audio/video all'avanguardia.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-number">2</div>
              <h3>Sale Multifunzionali</h3>
              <p>
                Spazi flessibili per gruppi piccoli, classi della scuola domenicale 
                e attività ministeriali.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-number">3</div>
              <h3>Area Giovani</h3>
              <p>
                Uno spazio dedicato ai giovani con aree ricreative e studio, 
                progettato per la prossima generazione.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-number">4</div>
              <h3>Caffetteria e Accoglienza</h3>
              <p>
                Un'area di ristoro per favorire la comunione e l'ospitalità 
                prima e dopo i servizi.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-number">5</div>
              <h3>Uffici Pastorali</h3>
              <p>
                Spazi dedicati per consulenza pastorale, amministrazione 
                e gestione dei ministeri.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-number">6</div>
              <h3>Aree Esterne</h3>
              <p>
                Giardini, parcheggi e spazi all'aperto per eventi comunitari 
                e momenti di comunione.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="futuro-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Costruiamo Insieme il Futuro</h2>
            <p>
              Questo progetto è possibile grazie alla generosità e al supporto 
              di tutta la nostra comunità. Se vuoi contribuire o saperne di più, 
              contattaci.
            </p>
            <div className="cta-buttons">
              <Link to="/contatti" className="cta-button primary">
                Contattaci
              </Link>
              <Link to="/unisciti" className="cta-button secondary">
                Unisciti a Noi
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Futuro;
