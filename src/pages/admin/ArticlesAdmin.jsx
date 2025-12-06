import React, { useState } from 'react';

const initialForm = {
  title: '',
  content: '',
  author: '',
  date: '',
  image: null,
};

export default function ArticlesAdmin() {
  const [form, setForm] = useState(initialForm);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.title || !form.content) {
      setError('Titolo e contenuto sono obbligatori.');
      return;
    }
    const newArticle = {
      ...form,
      id: Date.now(),
      image: form.image ? form.image.name : '',
    };
    setArticles([...articles, newArticle]);
    setForm(initialForm);
    setSuccess('Articolo inserito con successo!');
    // Qui si può aggiungere la logica per salvare su file o inviare a backend
  }

  return (
    <div className="admin-articles">
      <h2>Inserisci un nuovo articolo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titolo:</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Contenuto:</label>
          <textarea name="content" value={form.content} onChange={handleChange} required />
        </div>
        <div>
          <label>Autore:</label>
          <input name="author" value={form.author} onChange={handleChange} />
        </div>
        <div>
          <label>Data:</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} />
        </div>
        <div>
          <label>Immagine:</label>
          <input name="image" type="file" accept="image/*" onChange={handleChange} />
        </div>
        <button type="submit">Inserisci articolo</button>
      </form>
      {error && <div style={{color:'red'}}>{error}</div>}
      {success && <div style={{color:'green'}}>{success}</div>}
      <h3>Articoli inseriti</h3>
      <ul>
        {articles.map(a => (
          <li key={a.id}>
            <strong>{a.title}</strong> ({a.date})<br/>
            {a.author && <span>Autore: {a.author}</span>}<br/>
            <span>{a.content.slice(0, 100)}...</span>
            {a.image && <div>Immagine: {a.image}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
