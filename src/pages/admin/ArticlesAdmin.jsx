import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArticles, saveArticles, getCategories, saveCategories } from '../../data/articlesData';
import './ArticlesAdmin.css';

const initialForm = {
  id: '',
  title: '',
  content: '',
  excerpt: '',
  author: '',
  date: new Date().toISOString().split('T')[0],
  category: '',
  image: '',
  readTime: ''
};

export default function ArticlesAdmin() {
  const [form, setForm] = useState(initialForm);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [newCategory, setNewCategory] = useState({ value: '', label: '' });
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setArticles(getArticles());
    setCategories(getCategories());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'category' && value === 'custom') {
      setShowCustomCategory(true);
    } else {
      if (name === 'category') {
        setShowCustomCategory(false);
      }
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Se categoria custom, crea la categoria prima
    let categoryValue = form.category;
    if (showCustomCategory && newCategory.value && newCategory.label) {
      const updatedCategories = [...categories, newCategory];
      saveCategories(updatedCategories);
      setCategories(updatedCategories);
      categoryValue = newCategory.value;
      setNewCategory({ value: '', label: '' });
      setShowCustomCategory(false);
    }

    if (!form.title || !form.content || (!categoryValue && !showCustomCategory)) {
      setError('Titolo, contenuto e categoria sono obbligatori.');
      return;
    }

    const articleData = {
      ...form,
      category: categoryValue,
      id: editingId || `article-${Date.now()}`,
      excerpt: form.excerpt || form.content.slice(0, 150) + '...',
      readTime: form.readTime || `${Math.ceil(form.content.split(' ').length / 200)} min`
    };

    let updatedArticles;
    if (editingId) {
      updatedArticles = articles.map(a => a.id === editingId ? articleData : a);
      setSuccess('Articolo aggiornato con successo!');
    } else {
      updatedArticles = [articleData, ...articles];
      setSuccess('Articolo inserito con successo!');
    }

    saveArticles(updatedArticles);
    setArticles(updatedArticles);
    resetForm();

    setTimeout(() => setSuccess(''), 3000);
  };

  const handleEdit = (article) => {
    setForm(article);
    setEditingId(article.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (!confirm('Sei sicuro di voler eliminare questo articolo?')) return;

    const updatedArticles = articles.filter(a => a.id !== id);
    saveArticles(updatedArticles);
    setArticles(updatedArticles);
    setSuccess('Articolo eliminato con successo!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowCustomCategory(false);
    setNewCategory({ value: '', label: '' });
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.value || !newCategory.label) {
      setError('Inserisci sia il valore che l\'etichetta della categoria');
      return;
    }

    if (categories.some(c => c.value === newCategory.value)) {
      setError('Questa categoria esiste già');
      return;
    }

    const updatedCategories = [...categories, newCategory];
    saveCategories(updatedCategories);
    setCategories(updatedCategories);
    setNewCategory({ value: '', label: '' });
    setSuccess('Categoria aggiunta con successo!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDeleteCategory = (value) => {
    if (!confirm('Sei sicuro di voler eliminare questa categoria?')) return;

    const updatedCategories = categories.filter(c => c.value !== value);
    saveCategories(updatedCategories);
    setCategories(updatedCategories);
    setSuccess('Categoria eliminata con successo!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="articles-admin">
      <div className="articles-admin-container">
        <div className="admin-header">
          <h1>📝 Gestione Articoli</h1>
          <p>Aggiungi, modifica o elimina articoli del sito</p>
          <Link to="/admin/dashboard" className="btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>
            ← Torna alla Dashboard
          </Link>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="admin-content">
          <div className="admin-section">
            <h2>{editingId ? 'Modifica Articolo' : 'Nuovo Articolo'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Titolo *</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Es: La Grazia di Dio"
                  required
                />
              </div>

              <div className="form-group">
                <label>Autore *</label>
                <input
                  type="text"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="Es: Stefano Bonavolta"
                  required
                />
              </div>

              <div className="form-group">
                <label>Categoria *</label>
                <select
                  name="category"
                  value={showCustomCategory ? 'custom' : form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleziona una categoria</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                  <option value="custom">➕ Nuova Categoria...</option>
                </select>
                {showCustomCategory && (
                  <div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
                    <input
                      type="text"
                      value={newCategory.value}
                      onChange={(e) => setNewCategory({ ...newCategory, value: e.target.value })}
                      placeholder="Valore (es: testimonianze)"
                      required
                    />
                    <input
                      type="text"
                      value={newCategory.label}
                      onChange={(e) => setNewCategory({ ...newCategory, label: e.target.value })}
                      placeholder="Etichetta (es: Testimonianze)"
                      required
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Data pubblicazione *</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Estratto (breve descrizione)</label>
                <textarea
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  placeholder="Breve descrizione dell'articolo (opzionale, verrà generata automaticamente se lasciato vuoto)"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Contenuto completo *</label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Scrivi qui il contenuto completo dell'articolo..."
                  required
                />
              </div>

              <div className="form-group">
                <label>URL Immagine</label>
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-group">
                <label>Tempo di lettura</label>
                <input
                  type="text"
                  name="readTime"
                  value={form.readTime}
                  onChange={handleChange}
                  placeholder="Es: 5 min (opzionale, verrà calcolato automaticamente)"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingId ? '✓ Aggiorna Articolo' : '+ Aggiungi Articolo'}
                </button>
                {editingId && (
                  <button type="button" onClick={resetForm} className="btn-secondary">
                    ✕ Annulla
                  </button>
                )}
              </div>
            </form>

            <div className="category-manager">
              <h3>🏷️ Gestione Categorie</h3>
              <div className="category-list">
                {categories.map(cat => (
                  <div key={cat.value} className="category-item">
                    <span>{cat.label}</span>
                    <button onClick={() => handleDeleteCategory(cat.value)}>×</button>
                  </div>
                ))}
              </div>
              <form onSubmit={handleAddCategory} className="add-category-form">
                <input
                  type="text"
                  placeholder="Valore (es: teologia)"
                  value={newCategory.value}
                  onChange={(e) => setNewCategory({ ...newCategory, value: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Etichetta (es: Teologia)"
                  value={newCategory.label}
                  onChange={(e) => setNewCategory({ ...newCategory, label: e.target.value })}
                />
                <button type="submit">+ Aggiungi</button>
              </form>
            </div>
          </div>

          <div className="admin-section" style={{ maxWidth: '100%' }}>
            <h2>📚 Articoli Pubblicati ({articles.length})</h2>
            {articles.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📭</div>
                <p>Nessun articolo presente. Inizia aggiungendo il tuo primo articolo!</p>
              </div>
            ) : (
              <table className="articles-table">
                <thead>
                  <tr>
                    <th>Titolo</th>
                    <th>Autore</th>
                    <th>Categoria</th>
                    <th>Data</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map(article => (
                    <tr key={article.id}>
                      <td>
                        <strong>{article.title}</strong>
                        <br />
                        <small style={{ color: '#718096' }}>{article.excerpt?.slice(0, 80)}...</small>
                      </td>
                      <td>{article.author}</td>
                      <td>
                        <span className="category-badge">
                          {categories.find(c => c.value === article.category)?.label || article.category}
                        </span>
                      </td>
                      <td>{formatDate(article.date)}</td>
                      <td>
                        <div className="article-actions">
                          <button
                            onClick={() => handleEdit(article)}
                            className="btn-icon btn-edit"
                            title="Modifica"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(article.id)}
                            className="btn-icon btn-delete"
                            title="Elimina"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
