import React, { useState } from "react";
import "./Gallery.css";

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      url: "https://images.unsplash.com/photo-1508355991726-dc73fcecb7e7?q=80&w=800",
      title: "Celebrazione Domenicale",
      category: "Liturgia",
    },
    {
      url: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?q=80&w=800",
      title: "Gruppo Giovanile",
      category: "Comunità",
    },
    {
      url: "https://images.unsplash.com/photo-1609234656388-0ff363383899?q=80&w=800",
      title: "Coro Parrocchiale",
      category: "Musica",
    },
    {
      url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800",
      title: "Momenti di Preghiera",
      category: "Liturgia",
    },
    {
      url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800",
      title: "Incontri Biblici",
      category: "Formazione",
    },
    {
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800",
      title: "Eventi Speciali",
      category: "Comunità",
    },
    {
      url: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=800",
      title: "Vista di Pozzuoli",
      category: "Territorio",
    },
    {
      url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800",
      title: "Architettura Sacra",
      category: "Chiesa",
    },
  ];

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <h2 className="section-title">Galleria</h2>
        <p className="section-subtitle">
          Momenti della nostra vita comunitaria
        </p>

        <div className="gallery-grid">
          {images.map((image, index) => (
            <div
              key={index}
              className="gallery-item"
              onClick={() => setSelectedImage(image)}
            >
              <img src={image.url} alt={image.title} />
              <div className="gallery-overlay">
                <span className="gallery-category">{image.category}</span>
                <h3 className="gallery-title">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img src={selectedImage.url} alt={selectedImage.title} />
            <div className="lightbox-info">
              <span className="lightbox-category">
                {selectedImage.category}
              </span>
              <h3>{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;
