import React from "react";
import "./About.css";

function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-image">
            <img
              src="/images/Generale/PXL_20250928_090029265.jpg"
              alt="Chiesa Fiume di Vita"
            />
          </div>

          <div className="about-text">
            <h2>Amare DIO e amare Pozzuoli</h2>
            
            <p className="intro-text">
              Gesù era un uomo semplice con un piano semplice: far conoscere Dio.
            </p>

            <p>
              Insieme, guardiamo costantemente a Gesù attraverso la Parola di Dio, 
              ispirati a diventare ciò che Lui richiede, in modo da poter dare speranza 
              a coloro che ancora non conoscono l'amore straordinario di Dio.
            </p>

            <p>
              Lo facciamo costruendo una comunità radicata nella Bibbia, coltivando 
              profonde amicizie spirituali e facendo del bene nella nostra comunità.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
