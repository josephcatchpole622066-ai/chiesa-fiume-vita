import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <p className="hero-subtitle-small fade-in-up">CHIESA FIUME DI VITA</p>
        <h1 className="hero-title fade-in-up">Amare Dio e servire Cristo a Pozzuoli</h1>
        <p className="hero-subtitle fade-in-up">
          Vieni a trovarci alle 10:15
        </p>
        <div className="hero-buttons fade-in-up">
          <Link to="/unisciti" className="btn btn-hero">
            Unisciti a Noi
          </Link>
        </div>
      </div>
      <div className="scroll-indicator">
        <span></span>
      </div>
    </section>
  );
}

export default Hero;
