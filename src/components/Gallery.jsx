import React, { useState } from "react";
import "./Gallery.css";

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const baseUrl = import.meta.env.BASE_URL;
  const allImages = [
    `${baseUrl}images/Generale/PXL_20250405_195217346.jpg`,
    `${baseUrl}images/Generale/PXL_20250412_164521498.jpg`,
    `${baseUrl}images/Generale/PXL_20250426_185158011.jpg`,
    `${baseUrl}images/Generale/PXL_20250601_163148263.jpg`,
    `${baseUrl}images/Generale/PXL_20250914_100048260.PORTRAIT.jpg`,
    `${baseUrl}images/Generale/PXL_20250928_084839734.jpg`,
    `${baseUrl}images/Generale/PXL_20250928_090029265.jpg`,
    `${baseUrl}images/Generale/PXL_20251109_090820115.PORTRAIT.ORIGINAL.jpg`,
    `${baseUrl}images/Generale/PXL_20251109_112648076.PORTRAIT.jpg`,
    `${baseUrl}images/Generale/PXL_20251130_090459880.jpg`
  ];
  const DISPLAY_COUNT = 9;
  const [displayImages, setDisplayImages] = useState(allImages.slice(0, DISPLAY_COUNT));
  const [fadeIndex, setFadeIndex] = useState(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      // Scegli una posizione casuale da aggiornare
      const idx = Math.floor(Math.random() * DISPLAY_COUNT);
      // Scegli una nuova immagine che non sia già presente
      const currentSet = new Set(displayImages);
      const available = allImages.filter(img => !currentSet.has(img));
      if (available.length === 0) return; // tutte già mostrate
      const newImg = available[Math.floor(Math.random() * available.length)];
      setFadeIndex(idx);
      setTimeout(() => {
        setDisplayImages(prev => {
          const next = prev.slice();
          next[idx] = newImg;
          return next;
        });
        setFadeIndex(null);
      }, 500); // durata fade
    }, 2500);
    return () => clearInterval(interval);
  }, [displayImages, allImages]);

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <h2 className="section-title">Galleria</h2>
        <p className="section-subtitle">Momenti della nostra vita comunitaria</p>
        <div className="gallery-grid">
          {displayImages.map((url, index) => (
            <div
              key={index}
              className={`gallery-item${fadeIndex === index ? ' fade' : ''}`}
              onClick={() => setSelectedImage(url)}
            >
              <img src={url} alt={`Foto ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>✕</button>
            <img src={selectedImage} alt="Foto ingrandita" />
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;
