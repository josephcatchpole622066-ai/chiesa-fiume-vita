import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventsData } from '../../data/eventsData';
import './EventsAdmin.css';

function EventsAdmin() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    month: '',
    time: '',
    location: '',
    description: '',
    fullDescription: '',
    icon: '📅',
    category: 'liturgia',
    image: '',
    program: ['']
  });
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  useEffect(() => {
    // Carica eventi dal localStorage o usa eventsData come fallback
    const savedEvents = localStorage.getItem('churchEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      // Carica gli eventi dal file eventsData.js la prima volta
      setEvents(eventsData);
      localStorage.setItem('churchEvents', JSON.stringify(eventsData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'category' && value === 'custom') {
      setShowCustomCategory(true);
    } else {
      if (name === 'category') {
        setShowCustomCategory(false);
        setCustomCategory('');
      }
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleProgramChange = (index, value) => {
    const newProgram = [...formData.program];
    newProgram[index] = value;
    setFormData(prev => ({
      ...prev,
      program: newProgram
    }));
  };

  const addProgramItem = () => {
    setFormData(prev => ({
      ...prev,
      program: [...prev.program, '']
    }));
  };

  const removeProgramItem = (index) => {
    setFormData(prev => ({
      ...prev,
      program: prev.program.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const eventData = {
      ...formData,
      id: editingEvent ? editingEvent.id : `event-${Date.now()}`,
      category: showCustomCategory ? customCategory : formData.category,
      program: formData.program.filter(item => item.trim() !== '')
    };

    let updatedEvents;
    if (editingEvent) {
      updatedEvents = events.map(event => 
        event.id === editingEvent.id ? eventData : event
      );
    } else {
      updatedEvents = [...events, eventData];
    }

    setEvents(updatedEvents);
    localStorage.setItem('churchEvents', JSON.stringify(updatedEvents));
    
    resetForm();
    setShowForm(false);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      month: event.month,
      time: event.time,
      location: event.location,
      description: event.description,
      fullDescription: event.fullDescription,
      icon: event.icon,
      category: event.category,
      image: event.image,
      program: event.program.length > 0 ? event.program : ['']
    });
    setShowForm(true);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (eventId) => {
    if (window.confirm('Sei sicuro di voler eliminare questo evento?')) {
      const updatedEvents = events.filter(event => event.id !== eventId);
      setEvents(updatedEvents);
      localStorage.setItem('churchEvents', JSON.stringify(updatedEvents));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      month: '',
      time: '',
      location: '',
      description: '',
      fullDescription: '',
      icon: '📅',
      category: 'liturgia',
      image: '',
      program: ['']
    });
    setEditingEvent(null);
    setCustomCategory('');
    setShowCustomCategory(false);
  };

  return (
    <div className="events-admin">
      <div className="admin-container">
        <header className="admin-header">
          <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
            ← Torna alla Dashboard
          </button>
          <h1>📅 Gestione Eventi</h1>
          <p>Crea e gestisci gli eventi della chiesa</p>
        </header>

        <div className="admin-actions">
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="btn-primary"
          >
            {showForm ? '❌ Annulla' : '➕ Nuovo Evento'}
          </button>
        </div>

        {showForm && (
          <div className="event-form-container">
            <h2>{editingEvent ? '✏️ Modifica Evento' : '➕ Nuovo Evento'}</h2>
            <form onSubmit={handleSubmit} className="event-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Titolo *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Es: Santa Messa Domenicale"
                  />
                </div>

                <div className="form-group">
                  <label>Icona</label>
                  <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    placeholder="Es: ⛪"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Data (giorno) *</label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    placeholder="Es: 15"
                  />
                </div>

                <div className="form-group">
                  <label>Mese *</label>
                  <input
                    type="text"
                    name="month"
                    value={formData.month}
                    onChange={handleInputChange}
                    required
                    placeholder="Es: DIC"
                  />
                </div>

                <div className="form-group">
                  <label>Orario *</label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    placeholder="Es: 10:00 - 11:30"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Luogo *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="Es: Chiesa Principale"
                  />
                </div>

                <div className="form-group">
                  <label>Categoria *</label>
                  <select
                    name="category"
                    value={showCustomCategory ? 'custom' : formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="liturgia">Liturgia</option>
                    <option value="giovani">Giovani</option>
                    <option value="carita">Carità</option>
                    <option value="formazione">Formazione</option>
                    <option value="famiglia">Famiglia</option>
                    <option value="speciale">Speciale</option>
                    <option value="custom">➕ Nuova Categoria...</option>
                  </select>
                  {showCustomCategory && (
                    <input
                      type="text"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="Inserisci nuova categoria"
                      required
                      style={{ marginTop: '10px' }}
                    />
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Descrizione Breve *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  placeholder="Breve descrizione dell'evento (max 2-3 righe)"
                />
              </div>

              <div className="form-group">
                <label>Descrizione Completa *</label>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Descrizione dettagliata dell'evento"
                />
              </div>

              <div className="form-group">
                <label>URL Immagine</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-group">
                <label>Programma dell'Evento</label>
                {formData.program.map((item, index) => (
                  <div key={index} className="program-item">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleProgramChange(index, e.target.value)}
                      placeholder="Es: 10:00 - Accoglienza e canti iniziali"
                    />
                    {formData.program.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeProgramItem(index)}
                        className="btn-remove"
                      >
                        ❌
                      </button>
                    )}
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={addProgramItem}
                  className="btn-add-program"
                >
                  ➕ Aggiungi Voce Programma
                </button>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  {editingEvent ? '💾 Salva Modifiche' : '✅ Crea Evento'}
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  className="btn-cancel"
                >
                  ❌ Annulla
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="events-list">
          <h2>📋 Eventi Esistenti ({events.length})</h2>
          {events.length === 0 ? (
            <p className="no-events">Nessun evento creato. Clicca su "Nuovo Evento" per iniziare.</p>
          ) : (
            <div className="events-grid">
              {events.map(event => (
                <div key={event.id} className="event-card">
                  <div className="event-header">
                    <div className="event-date">
                      <span className="date">{event.date}</span>
                      <span className="month">{event.month}</span>
                    </div>
                    <div className="event-icon">{event.icon}</div>
                  </div>
                  <h3>{event.title}</h3>
                  <p className="event-meta">
                    <span>🕐 {event.time}</span>
                    <span>📍 {event.location}</span>
                  </p>
                  <p className="event-description">{event.description}</p>
                  <div className="event-actions">
                    <button 
                      onClick={() => handleEdit(event)}
                      className="btn-edit"
                    >
                      ✏️ Modifica
                    </button>
                    <button 
                      onClick={() => handleDelete(event.id)}
                      className="btn-delete"
                    >
                      🗑️ Elimina
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventsAdmin;
