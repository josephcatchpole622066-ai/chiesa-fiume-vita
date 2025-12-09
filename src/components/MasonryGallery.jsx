import React, { useState } from "react";
import Masonry from "react-masonry-css";
import Carousel, { Modal, ModalGateway } from "react-images";
import "./Gallery.css";

const BASE_URL = import.meta.env.BASE_URL;

const allImages = [
  { src: `${BASE_URL}images/Generale/PXL_20250405_195217346.jpg` },
  { src: `${BASE_URL}images/Generale/PXL_20250412_164521498.jpg` },
  { src: `${BASE_URL}images/Generale/PXL_20250426_185158011.jpg` },
  { src: `${BASE_URL}images/Generale/PXL_20250601_163148263.jpg` },
  { src: `${BASE_URL}images/Generale/PXL_20250914_100048260.PORTRAIT.jpg` },
  { src: `${BASE_URL}images/Generale/PXL_20250928_084839734.jpg` },
  { src: `${BASE_URL}images/Generale/PXL_20250928_090029265.jpg` },
  { src: `${BASE_URL}images/Generale/PXL_20251109_090820115.PORTRAIT.ORIGINAL.jpg` },
  { src: `${BASE_URL}images/Generale/PXL_20251109_112648076.PORTRAIT.jpg` },
  { src: `${BASE_URL}images/Generale/PXL_20251130_090459880.jpg` }
];

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
};

function MasonryGallery() {
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openLightbox = idx => {
    setCurrentImage(idx);
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setViewerIsOpen(false);
  };

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <h2 className="section-title">Galleria</h2>
        <p className="section-subtitle">Momenti della nostra vita comunitaria</p>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {allImages.map((img, idx) => (
            <div className="masonry-item" key={idx} onClick={() => openLightbox(idx)}>
              <img src={img.src} alt={`Foto ${idx + 1}`} className="masonry-img" />
            </div>
          ))}
        </Masonry>
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={allImages.map(x => ({ source: x.src }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    </section>
  );
}

export default MasonryGallery;
