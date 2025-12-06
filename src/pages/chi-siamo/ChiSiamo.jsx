import React from 'react';
import { Link } from 'react-router-dom';
import './ChiSiamo.css';

const ChiSiamo = () => {
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
              
              <div className="timeline">
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
              </div>
            </div>

            <div className="storia-image">
              <img src="/images/gallery/PXL_20250928_095128681.jpg" alt="La nostra comunità" />
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

      {/* Call to Action - In Cosa Crediamo */}
      <section className="credenze-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Vuoi sapere cosa crediamo?</h2>
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

      {/* Leadership */}
      <section className="leadership-section">
        <div className="container">
          <h2>La Nostra Leadership</h2>
          <div className="leaders-grid">
            <div className="leader-card">
              <div className="leader-placeholder">👨‍🏫</div>
              <h3>Pastore Principale</h3>
              <p className="leader-role">Guida Spirituale</p>
              <p className="leader-desc">
                Dedicato all'insegnamento della Parola e alla cura pastorale 
                della comunità.
              </p>
            </div>

            <div className="leader-card">
              <div className="leader-placeholder">👥</div>
              <h3>Anziani</h3>
              <p className="leader-role">Consiglio di Guida</p>
              <p className="leader-desc">
                Un team di leader maturi che sovrintendono alla vita spirituale 
                della chiesa.
              </p>
            </div>

            <div className="leader-card">
              <div className="leader-placeholder">🤝</div>
              <h3>Diaconi</h3>
              <p className="leader-role">Servizio Pratico</p>
              <p className="leader-desc">
                Servitori dedicati che si occupano delle necessità pratiche 
                della comunità.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChiSiamo;
