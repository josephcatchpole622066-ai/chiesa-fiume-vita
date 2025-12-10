import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import getImagePath from '../../utils/imagePaths';
import './ChiSiamo.css';

const ChiSiamo = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timeline = timelineRef.current;
      const timelineRect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calcola quanto della timeline è visibile
      const timelineTop = timelineRect.top;
      const timelineHeight = timelineRect.height;
      
      // Calcola la percentuale di scroll
      let scrollProgress = 0;
      
      if (timelineTop < windowHeight && timelineTop + timelineHeight > 0) {
        const visibleTop = Math.max(0, windowHeight - timelineTop);
        const visibleHeight = Math.min(timelineHeight, visibleTop);
        scrollProgress = (visibleHeight / timelineHeight) * 100;
      }
      
      // Applica la percentuale alla linea
      const timelineLine = timeline.querySelector('.timeline-line-progress');
      if (timelineLine) {
        timelineLine.style.height = `${Math.min(scrollProgress, 100)}%`;
      }

      // Anima i marker e il contenuto
      const items = timeline.querySelectorAll('.timeline-item');
      items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height / 2;
        
        if (itemCenter < windowHeight * 0.8) {
          item.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Esegui al mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="chi-siamo-page">
      {/* Hero */}
      <section className="chi-siamo-hero">
        <div className="container hero-content">
          <h1>Chi Siamo</h1>
          <p>La nostra storia, la nostra missione</p>
        </div>
      </section>

      {/* La Nostra Storia */}
      <section className="storia-section">
        <div className="container">
          <div className="storia-content">
            <div className="storia-text">
              <h2>La Nostra Storia</h2>
              <p className="intro">
                Chiesa Fiume di Vita è nata dal desiderio di creare una comunità 
                dove ogni persona possa sperimentare l'amore di Dio e crescere 
                nella fede cristiana.
              </p>
              
              <div className="timeline" ref={timelineRef}>
                <div className="timeline-line-progress"></div>
                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h3>Gli Inizi</h3>
                    <p>
                      Tutto è iniziato con un piccolo gruppo di credenti che si 
                      riunivano per pregare e studiare la Bibbia. Con il passare 
                      del tempo, la comunità è cresciuta, guidata dalla visione 
                      di essere una chiesa aperta, accogliente e radicata nella 
                      Parola di Dio.
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h3>La Crescita</h3>
                    <p>
                      Nel corso degli anni, abbiamo visto Dio operare meravigliosamente, 
                      portando nuove persone nella nostra comunità. Abbiamo sviluppato 
                      diversi ministeri per servire tutte le fasce d'età e le esigenze 
                      spirituali dei membri.
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h3>Oggi</h3>
                    <p>
                      Oggi siamo una famiglia di credenti che si riunisce regolarmente 
                      per adorare Dio, studiare la Sua Parola e sostenersi a vicenda. 
                      Continuiamo a crescere e a servire la nostra comunità locale con 
                      l'amore di Cristo.
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h3>Il Futuro</h3>
                    <p>
                      Guardiamo avanti con fede e speranza. Stiamo lavorando per costruire 
                      una nuova sede polifunzionale che permetterà alla nostra comunità 
                      di crescere e servire ancora meglio.
                    </p>
                    <Link to="/futuro" className="timeline-link">
                      Scopri il Progetto →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="storia-image">
              <img src={getImagePath('images/gallery/PXL_20250928_095128681.jpg')} alt="La nostra comunità" />
            </div>
          </div>
        </div>
      </section>

      {/* Missione e Visione */}
      <section className="missione-section">
        <div className="container">
          <div className="missione-grid">
            <div className="missione-card">
              <div className="card-icon">🎯</div>
              <h3>La Nostra Missione</h3>
              <p>
                Essere una comunità che ama Dio e ama le persone, portando 
                il messaggio di salvezza di Gesù Cristo attraverso l'insegnamento 
                biblico, la comunione fraterna e il servizio.
              </p>
            </div>

            <div className="missione-card">
              <div className="card-icon">👁️</div>
              <h3>La Nostra Visione</h3>
              <p>
                Vedere vite trasformate dal Vangelo, famiglie restaurate dalla 
                grazia di Dio, e una comunità che riflette l'amore di Cristo 
                in ogni aspetto della vita quotidiana.
              </p>
            </div>

            <div className="missione-card">
              <div className="card-icon">💎</div>
              <h3>I Nostri Valori</h3>
              <p>
                Amore, autenticità, accoglienza, servizio e crescita spirituale 
                sono i pilastri su cui costruiamo la nostra comunità. Crediamo 
                in una fede che si vive ogni giorno.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Anziani e Diaconi */}
      <section className="leadership-section">
        <div className="container">
          <div className="leadership-header">
            <h2>Anziani e Diaconi</h2>
            <p className="leadership-intro">
              La nostra chiesa è guidata e servita da uomini dedicati che camminano 
              con Dio e servono la comunità con passione e fedeltà.
            </p>
          </div>

          {/* Anziani */}
          <div className="leadership-category">
            <h3 className="category-title">Gli Anziani</h3>
            <p className="category-description">
              Gli anziani sono leader spirituali chiamati a guidare, insegnare e proteggere 
              la chiesa. Sono uomini di carattere provato, radicati nella Parola di Dio, 
              che sovrintendono alla vita spirituale della comunità.
            </p>
            
            <div className="leaders-grid">
              <div className="leader-card">
                <div className="leader-image">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop" alt="Anziano" />
                </div>
                <div className="leader-info">
                  <h4>Marco Rossi</h4>
                  <p className="leader-role">Anziano - Insegnamento</p>
                  <p className="leader-desc">
                    Con oltre 20 anni di servizio nella chiesa, Marco si dedica 
                    all'insegnamento biblico e alla formazione dei credenti. La sua 
                    passione è vedere vite trasformate dalla Parola di Dio.
                  </p>
                  <div className="leader-verse">
                    "Studia di presentare te stesso approvato davanti a Dio" - 2 Timoteo 2:15
                  </div>
                </div>
              </div>

              <div className="leader-card">
                <div className="leader-image">
                  <img src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop" alt="Anziano" />
                </div>
                <div className="leader-info">
                  <h4>Giuseppe Bianchi</h4>
                  <p className="leader-role">Anziano - Cura Pastorale</p>
                  <p className="leader-desc">
                    Giuseppe ha un cuore per la cura delle anime. Si dedica al 
                    discepolato personale e alla consulenza spirituale, accompagnando 
                    i credenti nel loro cammino di fede.
                  </p>
                  <div className="leader-verse">
                    "Pascete il gregge di Dio" - 1 Pietro 5:2
                  </div>
                </div>
              </div>

              <div className="leader-card">
                <div className="leader-image">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" alt="Anziano" />
                </div>
                <div className="leader-info">
                  <h4>Luca Ferri</h4>
                  <p className="leader-role">Anziano - Visione e Strategia</p>
                  <p className="leader-desc">
                    Luca porta saggezza e visione nella pianificazione strategica 
                    della chiesa. Il suo dono è aiutare la comunità a vedere il piano 
                    di Dio e camminare nella Sua volontà.
                  </p>
                  <div className="leader-verse">
                    "Dove non c'è visione, il popolo perisce" - Proverbi 29:18
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Diaconi */}
          <div className="leadership-category">
            <h3 className="category-title">I Diaconi</h3>
            <p className="category-description">
              I diaconi sono servitori chiamati a prendersi cura delle necessità pratiche 
              della chiesa. Attraverso il loro servizio fedele, permettono agli anziani di 
              concentrarsi sul ministero della Parola e della preghiera.
            </p>
            
            <div className="leaders-grid">
              <div className="leader-card">
                <div className="leader-image">
                  <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" alt="Diacono" />
                </div>
                <div className="leader-info">
                  <h4>Andrea Conti</h4>
                  <p className="leader-role">Diacono - Amministrazione</p>
                  <p className="leader-desc">
                    Andrea gestisce con fedeltà gli aspetti amministrativi e finanziari 
                    della chiesa, assicurandosi che le risorse siano utilizzate con 
                    saggezza per il regno di Dio.
                  </p>
                  <div className="leader-verse">
                    "Chi è fedele nelle cose minime" - Luca 16:10
                  </div>
                </div>
              </div>

              <div className="leader-card">
                <div className="leader-image">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" alt="Diacono" />
                </div>
                <div className="leader-info">
                  <h4>Stefano Greco</h4>
                  <p className="leader-role">Diacono - Accoglienza e Ospitalità</p>
                  <p className="leader-desc">
                    Stefano coordina il ministero dell'accoglienza, assicurandosi che 
                    ogni persona che entra nella nostra chiesa si senta benvenuta e 
                    parte della famiglia.
                  </p>
                  <div className="leader-verse">
                    "Siate ospitali gli uni con gli altri" - 1 Pietro 4:9
                  </div>
                </div>
              </div>

              <div className="leader-card">
                <div className="leader-image">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop" alt="Diacono" />
                </div>
                <div className="leader-info">
                  <h4>Matteo Lombardi</h4>
                  <p className="leader-role">Diacono - Servizio Sociale</p>
                  <p className="leader-desc">
                    Matteo coordina le iniziative di assistenza ai bisognosi, 
                    mettendo in pratica l'amore di Cristo attraverso azioni concrete 
                    di compassione e generosità.
                  </p>
                  <div className="leader-verse">
                    "Il Figlio dell'uomo non è venuto per essere servito" - Matteo 20:28
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - In Cosa Crediamo */}
      <section className="credenze-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Vuoi sapere in cosa crediamo?</h2>
            <p>
              Scopri i fondamenti teologici e dottrinali che guidano la nostra chiesa 
              e il nostro cammino di fede.
            </p>
            <Link to="/in-cosa-crediamo" className="cta-button">
              In Cosa Crediamo
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChiSiamo;
