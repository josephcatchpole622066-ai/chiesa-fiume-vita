import React, { useState } from "react";
import "./Gallery.css";

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      url: "/images/gallery/PXL_20250928_095128681.jpg",
      title: "Culto Domenicale",
      category: "Culto",
    },
    {
      url: "/images/gallery/PXL_20250927_175842812.jpg",
      title: "Comunione Fraterna",
      category: "Comunità",
    },
    {
      url: "/images/gallery/PXL_20251109_112648076.PORTRAIT.jpg",
      title: "Momento di Condivisione",
      category: "Comunità",
    },
    {
      url: "/images/gallery/PXL_20250701_181216695.jpg",
      title: "Estate in Chiesa",
      category: "Eventi",
    },
    {
      url: "/images/gallery/PXL_20250928_090029265.jpg",
      title: "Preghiera Insieme",
      category: "Culto",
    },
    {
      url: "/images/gallery/PXL_20251102_110438935.jpg",
      title: "Comunità in Festa",
      category: "Comunità",
    },
    {
      url: "/images/gallery/PXL_20250831_102745048.jpg",
      title: "Celebrazione Speciale",
      category: "Eventi",
    },
    {
      url: "/images/gallery/PXL_20251130_090248221.jpg",
      title: "Lode e Adorazione",
      category: "Culto",
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
