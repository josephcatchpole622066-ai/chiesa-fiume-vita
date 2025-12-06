import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ArticlesPage.css';

// Dati articoli (sarà sostituito con chiamate API o file JSON)
const articlesData = [
  {
    id: 'matrimonio-cristiano',
    title: 'Il Matrimonio in Cristo: Un Patto Sacro',
    author: 'Stefano Bonavolta',
    date: '2025-12-01',
    category: 'vita-cristiana',
    excerpt: 'Il matrimonio cristiano non è solo un contratto tra due persone, ma un patto sacro davanti a Dio. Scopriamo come vivere un matrimonio che glorifica Cristo e riflette il Suo amore per la Chiesa.',
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80',
    readTime: '8 min'
  },
  {
    id: 'la-croce-di-cristo',
    title: 'La Croce di Cristo: Il Cuore del Vangelo',
    author: 'Lorenzo Piol',
    date: '2025-11-28',
    category: 'teologia',
    excerpt: 'La croce non è solo un simbolo del cristianesimo, ma il fulcro del piano di salvezza di Dio. Esploriamo il significato profondo della morte di Cristo e come essa cambia radicalmente la nostra vita.',
    image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=80',
    readTime: '10 min'
  },
  {
    id: 'gioia-in-cristo',
    title: 'La Gioia in Cristo: Una Scelta Quotidiana',
    author: 'Josiah Catchpole',
    date: '2025-11-25',
    category: 'riflessioni',
    excerpt: 'La gioia cristiana non dipende dalle circostanze esterne, ma dalla nostra relazione con Cristo. Scopriamo come coltivare una gioia autentica e duratura anche nelle prove della vita.',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80',
    readTime: '6 min'
  }
];

const categories = [
  { value: 'tutte', label: 'Tutte le categorie' },
  { value: 'teologia', label: 'Teologia' },
  { value: 'vita-cristiana', label: 'Vita Cristiana' },
  { value: 'studi-biblici', label: 'Studi Biblici' },
  { value: 'testimonianze', label: 'Testimonianze Scritte' },
  { value: 'riflessioni', label: 'Riflessioni' }
];

function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState('tutte');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = articlesData.filter(article => {
    const matchesCategory = selectedCategory === 'tutte' || article.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  return (
    <div className="articles-page">
      <div className="articles-hero">
        <div className="articles-hero-overlay"></div>
        <div className="container articles-hero-content">
          <h1 className="articles-title">📝 Articoli</h1>
          <p className="articles-subtitle">
            Studi biblici, riflessioni e approfondimenti sulla Parola di Dio
          </p>
        </div>
      </div>

      <div className="container articles-content">
        <div className="articles-filters">
          <div className="filter-group">
            <label htmlFor="search">🔍 Cerca</label>
            <input
              id="search"
              type="text"
              placeholder="Cerca per titolo, autore o contenuto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="category-filter">🏷️ Categoria</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {(searchTerm || selectedCategory !== 'tutte') && (
            <button 
              className="clear-filters-btn"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('tutte');
              }}
            >
              ✕ Pulisci Filtri
            </button>
          )}
        </div>

        {articlesData.length === 0 ? (
          <div className="no-articles">
            <div className="no-articles-icon">📝</div>
            <h2>Articoli in arrivo</h2>
            <p>Stiamo lavorando per pubblicare nuovi articoli e studi biblici.</p>
            <p>Torna a trovarci presto!</p>
          </div>
        ) : (
          <>
            <div className="articles-count">
              <p>
                {filteredArticles.length === 0 
                  ? 'Nessun articolo trovato' 
                  : `${filteredArticles.length} articol${filteredArticles.length === 1 ? 'o' : 'i'} trovat${filteredArticles.length === 1 ? 'o' : 'i'}`
                }
              </p>
            </div>

            <div className="articles-grid">
              {filteredArticles.map((article) => (
                <Link 
                  to={`/articles/${article.id}`} 
                  key={article.id}
                  className="article-card"
                >
                  <div className="article-image">
                    <img src={article.image} alt={article.title} />
                    <div className="article-category-badge">{article.category}</div>
                  </div>

                  <div className="article-content">
                    <h3 className="article-title">{article.title}</h3>
                    <p className="article-excerpt">{article.excerpt}</p>
                    
                    <div className="article-meta">
                      <div className="article-author">
                        <span className="author-icon">✍️</span>
                        <span>{article.author}</span>
                      </div>
                      <div className="article-info">
                        <span className="article-date">📅 {formatDate(article.date)}</span>
                        <span className="article-read-time">⏱️ {article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ArticlesPage;
