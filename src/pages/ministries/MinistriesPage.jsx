import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MinistriesPage.css';

const MinistriesPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('tutti');

  const ministries = [
    {
      id: 'calcetto',
      name: 'Calcetto',
      category: 'sport',
      description: 'Momenti di comunione attraverso lo sport del calcio',
      icon: '⚽',
      color: '#27ae60',
      image: '/images/gallery/PXL_20250831_102745048.jpg'
    },
    {
      id: 'donne',
      name: 'Ministero Donne',
      category: 'comunione',
      description: 'Incontri di preghiera, studio biblico e sostegno tra sorelle',
      icon: '👭',
      color: '#e91e63',
      image: '/images/gallery/PXL_20250914_100048260.PORTRAIT.jpg'
    },
    {
      id: 'giovanissimi',
      name: 'Giovanissimi',
      category: 'giovani',
      description: 'Per ragazzi delle medie e superiori',
      icon: '🎒',
      color: '#9c27b0',
      image: '/images/gallery/PXL_20250927_175842812.jpg'
    },
    {
      id: 'giovani-famiglie',
      name: 'Giovani Famiglie',
      category: 'famiglie',
      description: 'Supporto e comunione per le giovani coppie con figli',
      icon: '👨‍👩‍👧‍👦',
      color: '#ff9800',
      image: '/images/gallery/PXL_20250928_095128681.jpg'
    },
    {
      id: 'chiesa-in-casa',
      name: 'Chiesa in Casa',
      category: 'casa',
      description: 'Incontri settimanali in diverse zone: Pozzuoli, Quarto, Monteruscello, Arcofelice',
      icon: '🏠',
      color: '#2196f3',
      image: '/images/gallery/PXL_20250928_090029265.jpg'
    },
    {
      id: 'uomini',
      name: 'Incontro Uomini',
      category: 'comunione',
      description: 'Crescita spirituale e sostegno tra fratelli',
      icon: '👨‍👨‍👦',
      color: '#3f51b5',
      image: '/images/gallery/PXL_20250928_084839734.jpg'
    },
    {
      id: 'scuola-domenicale',
      name: 'Scuola Domenicale',
      category: 'bambini',
      description: 'Insegnamento biblico per i più piccoli',
      icon: '📖',
      color: '#ffc107',
      image: '/images/gallery/PXL_20250404_180951920.jpg'
    },
    {
      id: 'aiuto-bisognosi',
      name: 'Aiuto ai Bisognosi',
      category: 'servizio',
      description: 'Sostegno concreto a chi è nel bisogno',
      icon: '🤝',
      color: '#f44336',
      image: '/images/gallery/PXL_20250928_090139141.jpg'
    },
    {
      id: 'inglese',
      name: 'Corso di Inglese',
      category: 'formazione',
      description: 'Lezioni di inglese per la comunità',
      icon: '🇬🇧',
      color: '#00bcd4',
      image: '/images/gallery/PXL_20250405_195217346.jpg'
    }
  ];

  const categories = [
    { id: 'tutti', label: 'Tutti i Ministeri', icon: '🌟' },
    { id: 'giovani', label: 'Giovani', icon: '🎒' },
    { id: 'famiglie', label: 'Famiglie', icon: '👨‍👩‍👧‍👦' },
    { id: 'casa', label: 'Chiesa in Casa', icon: '🏠' },
    { id: 'comunione', label: 'Comunione', icon: '🙏' },
    { id: 'servizio', label: 'Servizio', icon: '❤️' },
    { id: 'bambini', label: 'Bambini', icon: '👶' },
    { id: 'sport', label: 'Sport', icon: '⚽' },
    { id: 'formazione', label: 'Formazione', icon: '📖' }
  ];

  const filteredMinistries = selectedCategory === 'tutti' 
    ? ministries 
    : ministries.filter(m => m.category === selectedCategory);

  const handleMinistryClick = (ministryId) => {
    navigate(`/ministeri/${ministryId}`);
  };

  return (
    <div className="ministries-page">
      <div className="ministries-hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="hero-title">I Nostri Ministeri</h1>
          <p className="hero-subtitle">
            Scopri come servire e crescere nella fede insieme alla nostra comunità
          </p>
        </div>
      </div>

      <div className="container ministries-content">
        <div className="ministries-intro">
          <h2>Unisciti a Noi</h2>
          <p>
            Ogni ministero è un'opportunità per servire Dio, edificare la chiesa e fare la differenza 
            nella vita delle persone. Trova il tuo posto e scopri come i tuoi doni possono essere utilizzati 
            per la gloria di Dio.
          </p>
        </div>

        <div className="categories-filter">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="ministries-grid">
          {filteredMinistries.map(ministry => (
            <div 
              key={ministry.id} 
              className="ministry-card"
              onClick={() => handleMinistryClick(ministry.id)}
              style={{ '--card-color': ministry.color }}
            >
              {ministry.image && (
                <div className="ministry-card-image">
                  <img src={ministry.image} alt={ministry.name} />
                  <div className="image-overlay"></div>
                </div>
              )}
              <div className="ministry-card-body">
                <h3>{ministry.name}</h3>
                <p>{ministry.description}</p>
              </div>
              <div className="ministry-card-footer">
                <span className="learn-more">Scopri di più →</span>
              </div>
            </div>
          ))}
        </div>

        {filteredMinistries.length === 0 && (
          <div className="no-ministries">
            <p>Nessun ministero trovato in questa categoria.</p>
          </div>
        )}

        <div className="call-to-action">
          <div className="cta-content">
            <h2>Vuoi saperne di più?</h2>
            <p>
              Se sei interessato a partecipare o servire in uno dei nostri ministeri, 
              non esitare a contattarci. Saremo felici di rispondere alle tue domande 
              e aiutarti a trovare il posto giusto per te.
            </p>
            <button className="cta-button" onClick={() => navigate('/contatti')}>
              Contattaci
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinistriesPage;
