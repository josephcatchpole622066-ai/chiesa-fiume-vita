import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1 className="hero-title fade-in-up">Benvenuti nella nostra Chiesa</h1>
        <p className="hero-subtitle fade-in-up">
          Una comunità di fede, speranza e amore a Pozzuoli
        </p>
        <div className="hero-buttons fade-in-up">
          <button
            className="btn btn-secondary"
            onClick={() =>
              document
                .getElementById("contact")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Unisciti a Noi
          </button>
        </div>
      </div>
      <div className="scroll-indicator">
        <span></span>
      </div>
    </section>
  );
}

export default Hero;
