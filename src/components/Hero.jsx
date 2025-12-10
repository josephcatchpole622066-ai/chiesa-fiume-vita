import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section id="home" className="hero">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="hero-video"
      >
        <source src="/chiesa-fiume-vita/videos/hero-background.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay"></div>
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
