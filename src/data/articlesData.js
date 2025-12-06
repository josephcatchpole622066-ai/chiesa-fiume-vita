// Dati articoli - gestiti tramite localStorage
export const defaultArticles = [
  {
    id: 'matrimonio-cristiano',
    title: 'Il Matrimonio in Cristo: Un Patto Sacro',
    author: 'Stefano Bonavolta',
    date: '2025-12-01',
    category: 'vita-cristiana',
    excerpt: 'Il matrimonio cristiano non è solo un contratto tra due persone, ma un patto sacro davanti a Dio. Scopriamo come vivere un matrimonio che glorifica Cristo e riflette il Suo amore per la Chiesa.',
    content: 'Il matrimonio cristiano non è solo un contratto tra due persone, ma un patto sacro davanti a Dio. Scopriamo come vivere un matrimonio che glorifica Cristo e riflette il Suo amore per la Chiesa.',
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
    content: 'La croce non è solo un simbolo del cristianesimo, ma il fulcro del piano di salvezza di Dio. Esploriamo il significato profondo della morte di Cristo e come essa cambia radicalmente la nostra vita.',
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
    content: 'La gioia cristiana non dipende dalle circostanze esterne, ma dalla nostra relazione con Cristo. Scopriamo come coltivare una gioia autentica e duratura anche nelle prove della vita.',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80',
    readTime: '6 min'
  }
];

export const defaultCategories = [
  { value: 'teologia', label: 'Teologia' },
  { value: 'vita-cristiana', label: 'Vita Cristiana' },
  { value: 'studi-biblici', label: 'Studi Biblici' },
  { value: 'testimonianze', label: 'Testimonianze Scritte' },
  { value: 'riflessioni', label: 'Riflessioni' }
];

// Funzioni per gestire localStorage
const STORAGE_KEY_ARTICLES = 'chiesa_articles';
const STORAGE_KEY_CATEGORIES = 'chiesa_categories';

export const getArticles = () => {
  const stored = localStorage.getItem(STORAGE_KEY_ARTICLES);
  return stored ? JSON.parse(stored) : defaultArticles;
};

export const saveArticles = (articles) => {
  localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(articles));
};

export const getCategories = () => {
  const stored = localStorage.getItem(STORAGE_KEY_CATEGORIES);
  return stored ? JSON.parse(stored) : defaultCategories;
};

export const saveCategories = (categories) => {
  localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
};
