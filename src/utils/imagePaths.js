// Utility per gestire i path delle immagini con BASE_URL
const BASE_URL = import.meta.env.BASE_URL;

export const getImagePath = (path) => {
  // Rimuovi lo slash iniziale se presente
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${BASE_URL}${cleanPath}`;
};

export default getImagePath;
