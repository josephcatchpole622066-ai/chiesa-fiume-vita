import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Header.css";

function Header({ scrolled, isHomePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contenutiOpen, setContenutiOpen] = useState(false);
  const [chiSiamoOpen, setChiSiamoOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""} ${isHomePage ? "homepage" : ""}`}>
      <div className="container">
        <nav className="nav">
          <div className="logo">
            <Link to="/">
              <h1> Chiesa Pozzuoli</h1>
            </Link>
          </div>

          <button
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li 
              className="dropdown"
              onMouseEnter={() => setChiSiamoOpen(true)}
              onMouseLeave={() => setChiSiamoOpen(false)}
            >
              <span className="dropdown-trigger">
                Chi Siamo <span className="dropdown-arrow">▾</span>
              </span>
              <ul className={`dropdown-menu ${chiSiamoOpen ? 'show' : ''}`}>
                <li><Link to="/chi-siamo" onClick={() => { setMenuOpen(false); setChiSiamoOpen(false); }}>Chi Siamo</Link></li>
                <li><Link to="/in-cosa-crediamo" onClick={() => { setMenuOpen(false); setChiSiamoOpen(false); }}>In Cosa Crediamo</Link></li>
                <li><Link to="/futuro" onClick={() => { setMenuOpen(false); setChiSiamoOpen(false); }}>Il Futuro</Link></li>
              </ul>
            </li>
            <li><Link to="/ministeri" onClick={() => setMenuOpen(false)}>Ministeri</Link></li>
            <li><Link to="/" onClick={() => { setMenuOpen(false); setTimeout(() => scrollToSection('gallery'), 100); }}>Galleria</Link></li>
            <li><Link to="/" onClick={() => { setMenuOpen(false); setTimeout(() => scrollToSection('events'), 100); }}>Eventi</Link></li>
            <li 
              className="dropdown"
              onMouseEnter={() => setContenutiOpen(true)}
              onMouseLeave={() => setContenutiOpen(false)}
            >
              <span className="dropdown-trigger">
                Contenuti <span className="dropdown-arrow">▾</span>
              </span>
              <ul className={`dropdown-menu ${contenutiOpen ? 'show' : ''}`}>
                <li><Link to="/sermons" onClick={() => { setMenuOpen(false); setContenutiOpen(false); }}>Predicazioni</Link></li>
                <li><Link to="/testimonials" onClick={() => { setMenuOpen(false); setContenutiOpen(false); }}>Testimonianze</Link></li>
                <li><Link to="/articles" onClick={() => { setMenuOpen(false); setContenutiOpen(false); }}>Articoli</Link></li>
              </ul>
            </li>
            <li><Link to="/contatti" onClick={() => setMenuOpen(false)}>Contatti</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
