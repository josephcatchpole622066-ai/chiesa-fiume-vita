import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { testimonialsData, testimonialCategories } from '../../data/testimonialsData';
import './TestimonialsPage.css';

function TestimonialsPage() {
  const [selectedCategory, setSelectedCategory] = useState('tutte');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtra le testimonianze
  const filteredTestimonials = testimonialsData.filter(testimonial => {
    const matchesCategory = selectedCategory === 'tutte' || testimonial.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      testimonial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.person.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  const getVideoThumbnail = (videoUrl) => {
    const videoId = videoUrl.split('/').pop();
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  return (
    <div className="testimonials-page">
      <div className="testimonials-hero">
        <div className="testimonials-hero-overlay"></div>
        <div className="container testimonials-hero-content">
          <h1 className="testimonials-title">💬 Testimonianze</h1>
          <p className="testimonials-subtitle">
            Scopri come Dio ha trasformato le vite dei nostri fratelli
          </p>
        </div>
      </div>

      <div className="container testimonials-content">
        <div className="testimonials-filters">
          <div className="filter-group">
            <label htmlFor="search">🔍 Cerca</label>
            <input
              id="search"
              type="text"
              placeholder="Cerca per nome o contenuto..."
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
              {testimonialCategories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.icon} {category.label}
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

        <div className="testimonials-grid">
          {filteredTestimonials.length === 0 ? (
            <div className="no-results">
              <p>Nessuna testimonianza trovata.</p>
            </div>
          ) : (
            filteredTestimonials.map(testimonial => (
              <Link 
                to={`/testimonials/${testimonial.id}`} 
                key={testimonial.id}
                className="testimonial-card"
              >
                <div className="testimonial-thumbnail">
                  <img 
                    src={getVideoThumbnail(testimonial.videoUrl)} 
                    alt={testimonial.title}
                  />
                  <div className="play-overlay">
                    <div className="play-button">▶</div>
                  </div>
                  <div className="testimonial-duration">{testimonial.duration}</div>
                </div>

                <div className="testimonial-info">
                  <div className="testimonial-category">
                    {testimonialCategories.find(c => c.value === testimonial.category)?.icon}
                    {testimonialCategories.find(c => c.value === testimonial.category)?.label}
                  </div>
                  <h3 className="testimonial-title">{testimonial.title}</h3>
                  <p className="testimonial-person">👤 {testimonial.person}</p>
                  <p className="testimonial-description">{testimonial.description}</p>
                  <div className="testimonial-meta">
                    <span className="testimonial-date">📅 {formatDate(testimonial.date)}</span>
                    <span className="testimonial-views">👁️ {testimonial.views.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TestimonialsPage;
